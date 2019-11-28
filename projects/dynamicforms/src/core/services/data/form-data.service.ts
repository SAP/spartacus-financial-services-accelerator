import { YFormDefinition } from './../../models/form-occ.models';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { YFormData, FormStorageObject } from '../../models';
import { OccFormService } from '../../../occ/services/form/occ-form.service';

@Injectable()
export class FormDataService {
  private formLocalStorageData;
  private formsLocalStorageKey = 'dynamicFormsData';
  submittedForm = new BehaviorSubject<YFormData>(null);
  constructor(protected occYformsService: OccFormService) {}

  // ***SHOULD BE REMOVED WITH FSA-4419***
  currentForm$: BehaviorSubject<YFormData> = new BehaviorSubject({});
  getCurrentFormData(): Observable<YFormData> {
    return this.currentForm$.asObservable();
  }
  // ***SHOULD BE REMOVED WITH FSA-4419***

  submit() {
    this.submittedForm.next(null);
  }

  getSubmittedForm(): Observable<YFormData> {
    return this.submittedForm.asObservable();
  }

  setSubmittedForm(formData?: YFormData) {
    this.submittedForm.next(formData);
  }

  getFormDataIdFromLocalStorage(formDefinitionId) {
    this.formLocalStorageData = JSON.parse(localStorage.getItem(this.formsLocalStorageKey));
    if (this.formLocalStorageData === 'undefined' || this.formLocalStorageData === null) {
      return null;
    } else {
      return this.formLocalStorageData.filter(formObj => formObj.formDefinitionId === formDefinitionId).map(
      formObj =>  formObj.formDataId )[0];
    }
  }

  setFormDataToLocalStorage(formDefinitionId: string, formDataId: string) {
    this.formLocalStorageData = JSON.parse(
      localStorage.getItem(this.formsLocalStorageKey)
    );
    if (this.formLocalStorageData === 'undefined' || this.formLocalStorageData === null) {
      this.formLocalStorageData = [];
    }
    if (this.formLocalStorageData.length === 0) {
      this.formLocalStorageData.push(
        this.createDataForLocalStorage(formDataId, formDefinitionId)
      );
    } else {
      const index = this.formLocalStorageData
        .map(sessionData => sessionData.formDefinitionId)
        .indexOf(formDefinitionId);
      if (index !== -1) {
        this.formLocalStorageData[index].formDataId = formDataId;
      } else {
        this.formLocalStorageData.push(
          this.createDataForLocalStorage(formDataId, formDefinitionId)
        );
      }
    }
    localStorage.setItem(
      this.formsLocalStorageKey,
      JSON.stringify(this.formLocalStorageData)
    );
  }

  createDataForLocalStorage(formDataId, formDefinitionId) {
    const newSessionObj: FormStorageObject = {
      formDataId: formDataId,
      formDefinitionId: formDefinitionId,
    };
    return newSessionObj;
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
