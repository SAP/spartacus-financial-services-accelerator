import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { YFormData } from '../../models';

@Injectable()
export class FormDataService {
  currentForm$: BehaviorSubject<YFormData> = new BehaviorSubject({});

  getCurrentFormData(): Observable<YFormData> {
    return this.currentForm$.asObservable();
  }

  buildFormData(formData: { [name: string]: Object }): any {
    return this.filterData(formData);
  }

  filterData(formData: { [name: string]: Object }): any {
    if (formData.button) {
      delete formData.button;
    }
    return formData;
  }
}
