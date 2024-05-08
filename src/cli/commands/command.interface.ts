export interface Command {
  readonly name: string;
  get(): string;
  execute(...parameters: string[]): void;
}
