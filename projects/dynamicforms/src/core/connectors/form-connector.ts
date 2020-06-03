import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { YFormData, YFormDefinition } from '../models';
import { FormAdapter } from './form.adapter';

@Injectable({
  providedIn: 'root',
})
export class FormConnector {
  constructor(protected formAdapter: FormAdapter) {}

  getFormDefinitionById(
    applicationId,
    formDefinitionId
  ): Observable<YFormDefinition> {
    return this.formAdapter.getFormDefinitionById(
      applicationId,
      formDefinitionId
    );
  }
  getFormDefinitionByCategory(
    categoryCode,
    formDefinitionType
  ): Observable<YFormDefinition> {
    return this.formAdapter.getFormDefinitionByCategory(
      categoryCode,
      formDefinitionType
    );
  }
  getFormData(formDataId: string): Observable<YFormData> {
    return this.formAdapter.getFormData(formDataId);
  }

  saveFormData(formData: YFormData): Observable<YFormData> {
    return this.formAdapter.saveFormData(formData);
  }
}
