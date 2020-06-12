import { Observable } from 'rxjs';
import { YFormData, YFormDefinition } from '../models';

export abstract class FormAdapter {
  /**
   * Abstract method used to get form definition
   *
   * @param applicationId The identifier of application
   * @param formDefinitionId The identifier of form definition
   */
  abstract getFormDefinition(
    applicationId: string,
    formDefinitionId: string
  ): Observable<YFormDefinition>;

  /**
   * Abstract method used to get list of form definitions by category and form definition type
   *
   * @param categoryCode The category code
   * @param formDefinitionType The type of form definition
   */
  abstract getFormDefinitions(
    categoryCode: string,
    formDefinitionType: string
  ): Observable<YFormDefinition>;

  /**
   * Abstract method used to save (create new or update) form data
   *
   * @param formData The form data object
   */
  abstract saveFormData(formData: YFormData): Observable<YFormData>;

  /**
   * Abstract method used to get form data
   *
   * @param formDataId The identifier of form data object
   */
  abstract getFormData(formDataId: string): Observable<YFormData>;
}
