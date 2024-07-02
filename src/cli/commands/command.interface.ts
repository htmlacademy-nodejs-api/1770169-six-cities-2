export interface Command {
  readonly name: string;
  get(): string;
  execute(options: string[], ...parameters: string[]): void;
}
