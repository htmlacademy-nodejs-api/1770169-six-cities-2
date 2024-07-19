import EventEmitter from 'node:events';
import {createReadStream} from 'node:fs';

import {FileReader} from './file-reader.interface.js';
import {CHUNK_SIZE, DEFAULT_COUNT, LINE_POSITION} from './file-reader.constant.js';
import {ENCODING, Separator} from '../../constants/index.js';

export class TsvFileReader extends EventEmitter implements FileReader {
  constructor(
    private readonly filename: string
  ) {
    super();
  }

  public async read(): Promise<void>{
    const readStream = createReadStream(
      this.filename,
      {
        highWaterMark: CHUNK_SIZE,
        encoding: ENCODING
      }
    );

    let remainingData = '';
    let nextLinePosition = LINE_POSITION;
    let importedRowCount = DEFAULT_COUNT;

    await readStream.forEach(async (chunk) => {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf(Separator.Line)) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        await new Promise((resolve) => {
          this.emit('line', completeRow, resolve);
        });
      }
    });

    this.emit('end', importedRowCount);
  }
}
