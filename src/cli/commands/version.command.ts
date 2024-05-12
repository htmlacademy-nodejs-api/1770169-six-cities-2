import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

import chalk from 'chalk';

import {CommandName, ErrorMessage} from './command.constant.js';
import {Command} from './command.interface.js';

type PackageJSONConfig = {
  version: string;
}

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
    private readonly filePath: string = './package.json'
  ) {}

  public get(): string {
    return this.name;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(chalk.yellow(version));
    } catch(error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(chalk.red(`Can't read version from ${this.filePath}.`));
    }
  }

  private readVersion() {
    const filePath = resolve(this.filePath);
    const readFile = readFileSync(filePath, {encoding: 'utf8'});
    const content: unknown = JSON.parse(readFile);

    if (!isPackageJSONConfig(content)) {
      throw new Error(ErrorMessage.PARSE_CONTENT_ERROR);

    }
    return content.version;
  }
}
