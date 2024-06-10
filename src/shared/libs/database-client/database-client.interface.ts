export interface DatabaseClient {
  connect(uri: string): void;
  disconnect(): void;
}
