import {COMMAND_PREFIX} from './cli.constant.js';

type ParsedCommand = Record<string, string[]>;

export default class CommandParser {
  static parse(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let currentCommand: string = '';

    cliArguments.forEach((argument) => {
      if (argument.startsWith(COMMAND_PREFIX)) {
        parsedCommand[argument] = [];
        currentCommand = argument;
      } else if (currentCommand && argument) {
        parsedCommand[currentCommand].push(argument);
      }
    });

    return parsedCommand;
  }
}
