import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OccEndpointsService } from '@spartacus/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  YFormData,
  YFormDefinition,
} from '../../../core/models/form-occ.models';
import { FormSampleConfigurations } from '../../../util/form-sample-configurations';
import { FormAdapter } from '../../../core/connectors/form.adapter';

const FULL_PARAMS = 'fields=FULL';

@Injectable()
export class OccFormAdapter implements FormAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  createFormData(formData: YFormData): Observable<YFormData> {
    const url = this.getYFormsEndpoint() + '/formData';
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
    return this.http
      .post<YFormData>(url, formData.content, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  updateFormData(formData: YFormData): Observable<YFormData> {
    const url = this.getYFormsEndpoint() + '/formData/' + formData.id;
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
    return this.http
      .put<YFormData>(url, formData.content, { params: params })
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
    const formConfig = FormSampleConfigurations.sampleConfigurations.filter(
      item => item.formId === formDefinitionId
    )[0];
    if (formConfig !== undefined) {
      return of(formConfig);
    }
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
