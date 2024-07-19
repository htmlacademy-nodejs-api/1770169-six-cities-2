import {COMMAND_PREFIX, OPTION_PREFIX} from './cli.constant.js';
import {ParsedCommand} from './cli.type.js';

export default class CommandParser {
  static parse(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let currentCommand: string = '';
    cliArguments.forEach((argument) => {
      if (argument.startsWith(COMMAND_PREFIX)) {
        parsedCommand[argument] = {
          arguments: [],
          options: []
        };
        currentCommand = argument;
      } else if (currentCommand && argument.startsWith(OPTION_PREFIX)) {
        parsedCommand[currentCommand].options.push(argument);
      } else if (currentCommand && argument) {
        parsedCommand[currentCommand].arguments.push(argument);
      }
    });

    return parsedCommand;
  }
}
