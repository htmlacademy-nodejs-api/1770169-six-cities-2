import {WriteStream, createWriteStream} from 'node:fs';

import {FileWriter} from './file-writer.interface.js';
import {ENCODING} from '../../constants/index.js';

export class TsvFileWriter implements FileWriter {
  private stream: WriteStream;

  constructor(filename: string) {
    this.stream = createWriteStream(filename, {
      flags: 'w',
      encoding: ENCODING,
      autoClose: true
    });
  }

  public async write(row: string): Promise<unknown> {
    const writeSuccess = this.stream.write(`${row}\n`);

    if (!writeSuccess) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve(true));
      });
    }

    return Promise.resolve();
  }
}
