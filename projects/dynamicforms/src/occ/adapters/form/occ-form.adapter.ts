import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormAdapter } from '../../../core/connectors/form.adapter';
import {
  YFormData,
  YFormDefinition,
  YFormDefinitionList,
} from '../../../core/models/form-occ.models';

const FULL_PARAMS = 'FULL';

@Injectable()
export class OccFormAdapter implements FormAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  saveFormData(formData: YFormData, userId: string): Observable<YFormData> {
    const url = this.occEndpointService.buildUrl('createFormData', {
      urlParams: {
        userId: userId,
      },
    });
    let params: HttpParams = new HttpParams()
      .set('definitionId', formData.formDefinition.formId)
      .set('applicationId', formData.formDefinition.applicationId)
      .set('fields', FULL_PARAMS);
    if (formData.refId) {
      params = params.set('refId', formData.refId);
    }

    if (formData.id) {
      const formDataId = formData.id;
      const updateUrl = this.occEndpointService.buildUrl('formData', {
        urlParams: {
          userId: userId,
          formDataId,
        },
      });
      return this.http
        .put<YFormData>(updateUrl, formData.content, { params: params })
        .pipe(catchError((error: any) => throwError(error.json())));
    }

    return this.http
      .post<YFormData>(url, formData.content, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getFormData(formDataId: string, userId: string): Observable<YFormData> {
    const url = this.occEndpointService.buildUrl('formData', {
      urlParams: {
        userId: userId,
        formDataId,
      },
    });
    return this.http
      .get<YFormData>(url)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getFormDefinitions(
    categoryCode: string,
    formDefinitionType: string
  ): Observable<any> {
    const url = this.occEndpointService.buildUrl('formDefinitions');
    const params: HttpParams = new HttpParams()
      .set('categoryCode', categoryCode)
      .set('yFormDefinitionType', formDefinitionType)
      .set('fields', FULL_PARAMS);
    return this.http
      .get<YFormDefinitionList>(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getFormDefinition(
    applicationId: string,
    formDefinitionId: string
  ): Observable<any> {
    const url = this.occEndpointService.buildUrl('formDefinition', {
      urlParams: {
        formDefinitionId,
      },
    });
    const params: HttpParams = new HttpParams()
      .set('applicationId', applicationId)
      .set('fields', FULL_PARAMS);
    return this.http.get<YFormDefinition>(url, { params: params });
  }
}
