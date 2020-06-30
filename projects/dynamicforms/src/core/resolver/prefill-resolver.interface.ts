/**
 * An interface representing prefill resolver used for getting data from application state.
 */
export interface PrefillResolver {
  /**
   * Method used to get state object property
   *
   * @param fieldPath  If field path if defined resolver should use that to populate value.
   * Otherweise any return value of custom resolver will be populated
   */
  getPrefillValue(fieldPath?: string);
}
