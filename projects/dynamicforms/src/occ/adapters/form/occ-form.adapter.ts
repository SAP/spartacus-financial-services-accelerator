import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormAdapter } from '../../../core/connectors/form.adapter';
import {
  YFormData,
  YFormDefinition,
} from '../../../core/models/form-occ.models';

const FULL_PARAMS = 'fields=FULL';

@Injectable()
export class OccFormAdapter implements FormAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  saveFormData(formData: YFormData): Observable<YFormData> {
    let params = new HttpParams({
      fromString:
        FULL_PARAMS +
        '&definitionId=' +
        formData.formDefinition.formId +
        '&applicationId=' +
        formData.formDefinition.applicationId,
    });
    if (formData.refId) {
      params = params.append('refId', formData.refId);
    }

    const url = this.getYFormsEndpoint() + '/formData';

    if (formData.id) {
      const updateUrl = url + '/' + formData.id;
      return this.http
        .put<YFormData>(updateUrl, formData.content, { params: params })
        .pipe(catchError((error: any) => throwError(error.json())));
    }
    return this.http
      .post<YFormData>(url, formData.content, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getFormData(formDataId: string): Observable<YFormData> {
    const url = this.getYFormsEndpoint() + '/formData/' + formDataId;
    return this.http
      .get<YFormData>(url)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getFormDefinition(
    applicationId: string,
    formDefinitionId: string
  ): Observable<any> {
    const url = this.getYFormsEndpoint() + '/definitions/' + formDefinitionId;
    const params = new HttpParams({
      fromString: FULL_PARAMS + '&applicationId=' + applicationId,
    });
    return this.http
      .get<YFormDefinition>(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected getYFormsEndpoint() {
    const formsEndpoint = '/forms';
    return this.occEndpointService.getBaseEndpoint() + formsEndpoint;
  }
}
