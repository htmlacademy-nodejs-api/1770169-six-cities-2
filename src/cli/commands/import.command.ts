import chalk from 'chalk';

import TsvFileReader from '../../shared/libs/file-reader/tsv-file-reader.js';
import {CommandName} from './command.constant.js';
import {Command} from './command.interface.js';

export default class ImportCommand implements Command {
  readonly name: string = CommandName.Imort;

  get(): string {
    return this.name;
  }

  execute(...parameters: string[]): void {
    const [filename] = parameters;

    if (!filename) {
      throw new Error('The path to the file is not specified.');
    }

    const fileReader = new TsvFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(`Details: ${error.message}`));
    }
  }
}
