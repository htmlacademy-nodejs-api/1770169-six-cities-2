import got from 'got';

import chalk from 'chalk';

import {CommandName, ErrorMessage} from './command.constant.js';
import {Command} from './command.interface.js';
import {MockServerDataType} from '../../shared/types/index.js';
import {TsvOfferGenerate} from '../../shared/libs/data-generate/index.js';
import {TsvFileWriter} from '../../shared/libs/file-writer/index.js';
import {getErrorMessage} from '../../shared/helpers/index.js';
import {RADIX} from '../../shared/constants/index.js';

export default class GenerateCommand implements Command {
  readonly name: string = CommandName.Generate;
  private initialData: MockServerDataType;

  public get(): string {
    return this.name;
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, RADIX);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(chalk.yellow(`File ${filepath} was created!`));
    } catch (error: unknown) {
      console.error(chalk.red(ErrorMessage.GENERATE_DATA_ERROR));
      console.error(chalk.red(getErrorMessage(error)));
    }
  }

  private async load(url: string): Promise<void> {
    try {
      this.initialData = await got.get(url).json();
    } catch (error: unknown) {
      throw new Error(`${ErrorMessage.LOAD_DATA_ERROR}${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerate = new TsvOfferGenerate(this.initialData);
    const tsvFileWriter = new TsvFileWriter(filepath);

    for (let i = 0; i <= offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerate.generate());
    }
  }
}
