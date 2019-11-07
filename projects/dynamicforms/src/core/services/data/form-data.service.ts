import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class FormDataService {
  currentForm$ = new BehaviorSubject<any>({});

  buildFormData(formData: { [name: string]: Object }): any {
    const filteredData = this.filterData(formData);
    this.currentForm$.next(formData);
    return filteredData;
  }

  filterData(formData: any): any {
    // TO BE IMPLEMENTED
    return formData;
  }

  getCurrentFormData(): Observable<any> {
    return this.currentForm$.asObservable();
  }
}
