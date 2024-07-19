export type CommandValue = {
  arguments: string[],
  options: string[]
}
export type ParsedCommand = Record<string, CommandValue>;
