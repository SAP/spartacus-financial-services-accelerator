import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { YFormData, YFormDefinition } from '../models';
import { FormAdapter } from './form.adapter';

@Injectable({
  providedIn: 'root',
})
export class FormConnector {
  constructor(protected formAdapter: FormAdapter) {}

  getFormDefinition(
    applicationId,
    formDefinitionId
  ): Observable<YFormDefinition> {
    return this.formAdapter.getFormDefinition(applicationId, formDefinitionId);
  }
  getFormDefinitions(
    categoryCode: string,
    formDefinitionType: string
  ): Observable<YFormDefinition> {
    return this.formAdapter.getFormDefinitions(
      categoryCode,
      formDefinitionType
    );
  }
  getFormData(formDataId: string, userId: string): Observable<YFormData> {
    return this.formAdapter.getFormData(formDataId, userId);
  }

  saveFormData(formData: YFormData, userId: string): Observable<YFormData> {
    return this.formAdapter.saveFormData(formData, userId);
  }
}
