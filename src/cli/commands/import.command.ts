import chalk from 'chalk';

import {TsvFileReader} from '../../shared/libs/file-reader/index.js';
import {CommandName, ErrorMessage} from './command.constant.js';
import {Command} from './command.interface.js';
import {createOffer, getErrorMessage} from '../../shared/helpers/index.js';

export default class ImportCommand implements Command {
  readonly name: string = CommandName.Import;

  public get(): string {
    return this.name;
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;

    if (!filename) {
      throw new Error(ErrorMessage.UNSPECIFIED_PATH_ERROR);
    }

    const fileReader = new TsvFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error: unknown) {
      console.error(chalk.red(ErrorMessage.IMPORT_ERROR, filename));
      console.error(chalk.red(getErrorMessage(error)));
    }
  }

  private onImportedLine(line: string) {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(chalk.yellow(`${count} rows imported.`));
  }
}
