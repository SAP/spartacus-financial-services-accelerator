export abstract class DocumentAdapter {
  /**
   * Abstract method used to sign documents for customer
   *
   * @param userId The user id
   * @param documentCodes Document identifiers
   * @param signStatus The boolean value. Based on this param document should be signed or unsigned0
   */
  abstract signDocuments(
    userId: string,
    documentCodes: string,
    signStatus: boolean
  );
}
