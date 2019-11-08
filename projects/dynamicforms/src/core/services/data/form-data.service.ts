import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { YFormData } from '../../models';
import { OccYformService } from '../../../occ/services/yform/occ-yform.service';

@Injectable()
export class FormDataService {
  constructor(protected occYformsService: OccYformService) {}

  currentForm$: BehaviorSubject<YFormData> = new BehaviorSubject({});

  getCurrentFormData(): Observable<YFormData> {
    return this.currentForm$.asObservable();
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

  filterData(formData: { [name: string]: Object }): any {
    if (formData.button) {
      delete formData.button;
    }
    return formData;
  }
}
