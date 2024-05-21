import EventEmitter from 'node:events';
import {createReadStream} from 'node:fs';

import {FileReader} from './file-reader.interface.js';
import {CHUNK_SIZE} from './file-reader.constant.js';
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
    let nextLinePosition = -1;
    let importedRowCount = 0;

    await readStream.forEach((chunk) => {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf(Separator.LINE_SEPARATOR)) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        this.emit('line', completeRow);
      }
    });

    this.emit('end', importedRowCount);
  }
}
