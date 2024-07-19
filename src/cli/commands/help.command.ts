import chalk from 'chalk';

import {CommandName} from './command.constant.js';
import {Command} from './command.interface.js';

export default class HelpCommand implements Command {
  readonly name: string = CommandName.Help;

  public get(): string {
    return this.name;
  }

  public execute(_options: string[], ..._parameters: string[]): void {
    console.info(chalk.yellow(`
      Программа для подготовки данных для REST API сервера.

      Пример: cli.js --<command> [--arguments]

      Команды:

      --version:                   # выводит номер версии
      --help:                      # печатает этот текст
      --import <path>:             # импортирует данные из TSV
      --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
    `));
  }
}
