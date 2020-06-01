/**
   * Method used to get state object property
   *
   * @param fieldPath Path to the property
   */
export interface PrefillResolver {
  getFieldValue(fieldPath: string);
}
