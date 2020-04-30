import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { FormStorageObject, YFormData, YFormDefinition } from '../../models';
import * as fromAction from '../../store/actions';
import * as fromSelector from '../../store/selectors';
import { StateWithForm } from '../../store/state';

@Injectable()
export class FormDataService {
  private formsLocalStorageKey = 'dynamicFormsData';
  submittedForm = new BehaviorSubject<YFormData>(null);

  constructor(protected store: Store<StateWithForm>) {}

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

  saveFormData(formData: YFormData) {
    this.store.dispatch(
      new fromAction.SaveFormData({
        formData: formData,
      })
    );
  }

  loadFormDefinition(applicationId: string, formDefinitionId: string) {
    this.store.dispatch(
      new fromAction.LoadFormDefinition({
        applicationId: applicationId,
        formDefinitionId: formDefinitionId,
      })
    );
  }

  loadFormData(formDataId: string) {
    this.store.dispatch(
      new fromAction.LoadFormData({
        formDataId: formDataId,
      })
    );
  }

  getFormData(): Observable<YFormData> {
    return this.store.select(fromSelector.getFormDataLoaded).pipe(
      filter(loaded => loaded),
      take(1),
      switchMap(_ => {
        return this.store.select(fromSelector.getFormData);
      })
    );
  }

  getFormDefinition(): Observable<YFormDefinition> {
    return this.store.select(fromSelector.getFormDefinitionLoaded).pipe(
      filter(loaded => loaded),
      take(1),
      switchMap(_ => {
        return this.store.select(fromSelector.getFormDefinition);
      })
    );
  }
}
