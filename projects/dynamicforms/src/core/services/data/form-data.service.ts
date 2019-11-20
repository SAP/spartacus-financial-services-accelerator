import { YFormDefinition } from './../../models/form-occ.models';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { YFormData } from '../../models';
import { OccFormService } from '../../../occ/services/form/occ-form.service';

@Injectable()
export class FormDataService {
  constructor(protected occYformsService: OccFormService) {}

  currentForm$: BehaviorSubject<YFormData> = new BehaviorSubject({});
  isSubmitted = new BehaviorSubject<boolean>(false);

  getCurrentFormData(): Observable<YFormData> {
    return this.currentForm$.asObservable();
  }

  submit() {
    this.isSubmitted.next(false);
  }

  checkSubmitted() {
    return this.isSubmitted.asObservable();
  }

  setSubmitted(submitted: boolean) {
    this.isSubmitted.next(submitted);
  }

  saveFormData(
    formId: string,
    applicationId: string,
    formContent: any
  ): Observable<YFormData> {
    const filteredData = this.filterData(formContent);
    return this.occYformsService.saveFormData(
      formId,
      applicationId,
      filteredData
    );
  }

  getFormData(formDataId: string): Observable<YFormData> {
    return this.occYformsService.getFormData(formDataId);
  }

  getFormDefinition(
    applicationId: string,
    formDefinitionId: string
  ): Observable<YFormDefinition> {
    return this.occYformsService.getFormDefinition(
      applicationId,
      formDefinitionId
    );
  }

  filterData(formData: { [name: string]: Object }): any {
    if (formData.button) {
      delete formData.button;
    }
    return formData;
  }
}
