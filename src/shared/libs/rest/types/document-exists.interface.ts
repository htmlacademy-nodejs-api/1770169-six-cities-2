export interface DocumentExists {
  exists(value: string): Promise<boolean>;
}
