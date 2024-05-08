import CommandParser from './command-parser.js';
import {CommandName} from './commands/command.constant.js';
import {Command} from './commands/command.interface.js';

type Commands = Record<string, Command>

export default class CLIApplication {
  private commands: Commands = {};

  constructor(
    private defaultCommand: string = CommandName.Help
  ) {}

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public registerCommands(commands: Command[]) {
    commands.forEach((command) => {
      if (Object.hasOwn(this.commands, command.name)) {
        throw new Error(`Command ${command.name} is already registered.`);
      }

      this.commands[command.name] = command;
    });
  }

  public processComand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }

  private getDefaultCommand(): Command | never {
    if (!this.commands[this.defaultCommand]) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered.`);
    }
    return this.commands[this.defaultCommand];
  }
}
