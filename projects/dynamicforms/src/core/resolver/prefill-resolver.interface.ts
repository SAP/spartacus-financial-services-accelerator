/**
 * An interface representing prefill resolver used for getting data from application state.
 */
export interface PrefillResolver {
  /**
   * Method used to get state object property
   *
   * @param fieldPath  Path to the property
   */
  getFieldValue(fieldPath: string);
}
