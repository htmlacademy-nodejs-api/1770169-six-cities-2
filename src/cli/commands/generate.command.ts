import {CommandName} from './command.constant.js';
import {Command} from './command.interface.js';

export default class GenerateCommand implements Command {
  readonly name: string = CommandName.Generate;

  get(): string {
    return this.name;
  }

  execute(...parameters: string[]): void {
    const [count, filepath, url] = parameters;
  }
}
