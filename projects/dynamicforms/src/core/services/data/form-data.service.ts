import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormStorageObject, YFormData, YFormDefinition } from '../../models';
import * as fromSelector from '../../store/selectors';
import { filter, switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { StateWithFormDefinition } from '../../store/form-definition-state';
import * as fromAction from '../../store/actions';
import { FormConnector } from '../../connectors/form-connector';

@Injectable()
export class FormDataService {
  private formsLocalStorageKey = 'dynamicFormsData';
  submittedForm = new BehaviorSubject<YFormData>(null);

  constructor(
    protected formConnector: FormConnector,
    protected store: Store<StateWithFormDefinition>
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

  getFormDataIdByCategory(categoryCode: string): string {
    const formLocalStorageData = JSON.parse(
      localStorage.getItem(this.formsLocalStorageKey)
    );
    if (formLocalStorageData) {
      return formLocalStorageData
        .filter(formObj => formObj.categoryCode === categoryCode)
        .map(formObj => formObj.formDataId)[0];
    }
    return null;
  }

  setFormDataToLocalStorage(formData: YFormData) {
    let formLocalStorageData = JSON.parse(
      localStorage.getItem(this.formsLocalStorageKey)
    );
    if (
      formLocalStorageData === undefined ||
      formLocalStorageData === null ||
      formLocalStorageData.length === 0
    ) {
      formLocalStorageData = [this.createDataForLocalStorage(formData)];
    } else {
      const index = formLocalStorageData
        .map(sessionData => sessionData.formDefinitionId)
        .indexOf(formData.formDefinition.formId);
      index !== -1
        ? (formLocalStorageData[index].formDataId = formData.id)
        : formLocalStorageData.push(this.createDataForLocalStorage(formData));
    }
    localStorage.setItem(
      this.formsLocalStorageKey,
      JSON.stringify(formLocalStorageData)
    );
  }

  createDataForLocalStorage(formData: YFormData): FormStorageObject {
    return {
      formDataId: formData.id,
      formDefinitionId: formData.formDefinition.formId,
      categoryCode: formData.categoryCode,
    };
  }

  saveFormData(formData: YFormData): Observable<YFormData> {
    // TO DO - Replace with actions instead of direct call to OCC
    return formData.id
      ? this.formConnector.updateFormData(formData)
      : this.formConnector.createFormData(formData);
  }

  getFormData(formDataId: string): Observable<YFormData> {
    return this.formConnector.getFormData(formDataId);
  }

  loadFormDefinition(applicationId: string, formDefinitionId: string) {
    this.store.dispatch(
      new fromAction.LoadFormDefinition({
        applicationId: applicationId,
        formDefinitionId: formDefinitionId,
      })
    );
  }
  getFormDefinition(): Observable<YFormDefinition> {
    return this.store.select(fromSelector.getLoaded).pipe(
      filter(loaded => loaded),
      take(1),
      switchMap(_ => {
        return this.store.select(fromSelector.getFormDefinition);
      })
    );
  }
}
