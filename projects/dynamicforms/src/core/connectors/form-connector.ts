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

  getFormData(formDataId: string): Observable<YFormData> {
    return this.formAdapter.getFormData(formDataId);
  }

  saveFormData(formData: YFormData): Observable<YFormData> {
    return this.formAdapter.saveFormData(formData);
  }
}
