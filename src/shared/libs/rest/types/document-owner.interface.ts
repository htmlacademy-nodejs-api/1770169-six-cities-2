export interface DocumentOwner {
  owner(documentId: string, userId: string): Promise<boolean>;
}
