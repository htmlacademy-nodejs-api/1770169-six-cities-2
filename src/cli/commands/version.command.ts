import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

import chalk from 'chalk';

import {CommandName, ErrorMessage} from './command.constant.js';
import {Command} from './command.interface.js';
import {createMessage, getErrorMessage} from '../../shared/helpers/index.js';
import {ENCODING} from '../../shared/constants/index.js';
import {GET_VERSION_FILE_PATH} from '../cli.constant.js';
import {PackageJSONConfig} from './command.type.js';

function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

export default class VersionCommand implements Command {
  readonly name: string = CommandName.Version;

  constructor(
    private readonly filePath: string = GET_VERSION_FILE_PATH
  ) {}

  public get(): string {
    return this.name;
  }

  public async execute(_options: string[], ..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(chalk.yellow(version));
    } catch(error: unknown) {
      console.error(chalk.red(createMessage(ErrorMessage.READ_VERSION_ERROR, [this.filePath])));
      console.error(chalk.red(getErrorMessage(error)));
    }
  }

  private readVersion() {
    const filePath = resolve(this.filePath);
    const readFile = readFileSync(filePath, {encoding: ENCODING});
    const content: unknown = JSON.parse(readFile);

    if (!isPackageJSONConfig(content)) {
      throw new Error(ErrorMessage.PARSE_CONTENT_ERROR);

    }
    return content.version;
  }
}
