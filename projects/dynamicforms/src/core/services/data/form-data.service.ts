import { Injectable } from '@angular/core';
import { CartService } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OccFormService } from '../../../occ/services/form/occ-form.service';
import { YFormData, FormStorageObject } from '../../models';
import { YFormDefinition } from './../../models/form-occ.models';

@Injectable()
export class FormDataService {
  private formsLocalStorageKey = 'dynamicFormsData';
  submittedForm = new BehaviorSubject<YFormData>(null);
  constructor(
    protected occYformsService: OccFormService,
    protected cartService: CartService
  ) {}

  // ***SHOULD BE REMOVED WITH FSA-4419***
  currentForm$: BehaviorSubject<YFormData> = new BehaviorSubject({});
  getCurrentFormData(): Observable<YFormData> {
    return this.currentForm$.asObservable();
  }
  // ***SHOULD BE REMOVED WITH FSA-4419***

  submit(form: YFormData) {
    this.submittedForm.next(form);
  }

  getSubmittedForm(): Observable<YFormData> {
    return this.submittedForm.asObservable();
  }

  setSubmittedForm(formData?: YFormData) {
    this.submittedForm.next(formData);
  }

  getFormDataIdFromLocalStorage(formDefinitionId: string): string {
    const formLocalStorageData = JSON.parse(
      localStorage.getItem(this.formsLocalStorageKey)
    );
    if (formLocalStorageData) {
      return formLocalStorageData
        .filter(formObj => formObj.formDefinitionId === formDefinitionId)
        .map(formObj => formObj.formDataId)[0];
    }
    return null;
  }

  setFormDataToLocalStorage(formDefinitionId: string, formDataId: string) {
    let formLocalStorageData = JSON.parse(
      localStorage.getItem(this.formsLocalStorageKey)
    );
    if (
      formLocalStorageData === undefined ||
      formLocalStorageData === null ||
      formLocalStorageData.length === 0
    ) {
      formLocalStorageData = [
        this.createDataForLocalStorage(formDataId, formDefinitionId),
      ];
    } else {
      const index = formLocalStorageData
        .map(sessionData => sessionData.formDefinitionId)
        .indexOf(formDefinitionId);
      index !== -1
        ? (formLocalStorageData[index].formDataId = formDataId)
        : formLocalStorageData.push(
            this.createDataForLocalStorage(formDataId, formDefinitionId)
          );
    }
    localStorage.setItem(
      this.formsLocalStorageKey,
      JSON.stringify(formLocalStorageData)
    );
  }

  createDataForLocalStorage(formDataId, formDefinitionId): FormStorageObject {
    return {
      formDataId: formDataId,
      formDefinitionId: formDefinitionId,
    };
  }

  saveFormData(
    formId: string,
    applicationId: string,
    formContent: any
  ): Observable<YFormData> {
    const refId = formContent.refId;

    const filteredData = this.filterData(formContent);

    return this.occYformsService.saveFormData(
      formId,
      applicationId,
      filteredData,
      undefined,
      refId
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
    if (formData.refId) {
      delete formData.refId;
    }
    return formData;
  }
}
