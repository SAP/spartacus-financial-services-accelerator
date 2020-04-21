import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormAdapter } from './form.adapter';
import { YFormData, YFormDefinition } from '../models';

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

  getFormData(formDataId: string): Observable<YFormData> {
    return this.formAdapter.getFormData(formDataId);
  }

  createFormData(formData: YFormData): Observable<YFormData> {
    return this.formAdapter.createFormData(formData);
  }

  updateFormData(formData: YFormData): Observable<YFormData> {
    return this.formAdapter.updateFormData(formData);
  }
}
