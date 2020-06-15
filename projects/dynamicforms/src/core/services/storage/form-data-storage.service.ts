import { Injectable } from '@angular/core';
import { FormStorageObject, YFormData } from '../../models';

export const DYNAMIC_FORMS_LOCAL_STORAGE_KEY = 'dynamicForms-local-data';

@Injectable()
export class FormDataStorageService {
  formLocalStorageData = JSON.parse(
    localStorage.getItem(DYNAMIC_FORMS_LOCAL_STORAGE_KEY)
  );

  clearFormDataLocalStorage() {
    this.formLocalStorageData = null;
  }

  setFormDataToLocalStorage(formData: YFormData) {
    if (!this.formLocalStorageData || this.formLocalStorageData.length === 0) {
      this.formLocalStorageData = [this.createDataForLocalStorage(formData)];
    } else {
      const index = this.formLocalStorageData
        .map(sessionData => sessionData.formDefinitionId)
        .indexOf(formData.formDefinition.formId);
      index !== -1
        ? (this.formLocalStorageData[index].formDataId = formData.id)
        : this.formLocalStorageData.push(
            this.createDataForLocalStorage(formData)
          );
    }
    localStorage.setItem(
      DYNAMIC_FORMS_LOCAL_STORAGE_KEY,
      JSON.stringify(this.formLocalStorageData)
    );
  }

  getFormDataIdByDefinitionCode(formDefinitionCode: string): string {
    if (this.formLocalStorageData) {
      return this.formLocalStorageData
        .filter(formObj => formObj.formDefinitionId === formDefinitionCode)
        .map(formObj => formObj.formDataId)[0];
    }
  }

  getFormDataIdByCategory(categoryCode: string): string {
    if (this.formLocalStorageData) {
      return this.formLocalStorageData
        .filter(formObj => formObj.categoryCode === categoryCode)
        .map(formObj => formObj.formDataId)[0];
    }
  }

  protected createDataForLocalStorage(formData: YFormData): FormStorageObject {
    return {
      formDataId: formData.id,
      formDefinitionId: formData.formDefinition.formId,
      categoryCode: formData.categoryCode,
    };
  }
}
