import { Observable } from 'rxjs';
import { YFormData, YFormDefinition } from '@fsa/dynamicforms';

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
   * Abstract method used to create new form data
   *
   * @param formData The form data object
   */
  abstract createFormData(formData: YFormData): Observable<YFormData>;

  /**
   * Abstract method used to update existing form data
   *
   * @param formData The form data object
   */
  abstract updateFormData(formData: YFormData): Observable<YFormData>;

  /**
   * Abstract method used to get form data
   *
   * @param formDataId The identifier of form data object
   */
  abstract getFormData(formDataId: string): Observable<YFormData>;
}
