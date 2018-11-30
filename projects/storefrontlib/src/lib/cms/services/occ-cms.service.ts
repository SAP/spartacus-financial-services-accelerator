import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { IdList } from './../models/idList.model';
import { CmsModuleConfig } from '../cms-module-config';
import { PageContext, PageType } from '@spartacus/core';

@Injectable()
export class OccCmsService {
  protected headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private config: CmsModuleConfig) {}

  protected getBaseEndPoint() {
    return (
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.config.site.baseSite +
      '/cms'
    );
  }

  loadPageData(pageContext: PageContext, fields?: string): Observable<any> {
    let strParams = 'pageType=' + pageContext.type;

    if (pageContext.type === PageType.CONTENT_PAGE) {
      strParams = strParams + '&pageLabelOrId=' + pageContext.id;
    } else {
      strParams = strParams + '&code=' + pageContext.id;
    }

    if (fields !== undefined) {
      strParams = strParams + '&fields=' + fields;
    }

    return this.http
      .get(this.getBaseEndPoint() + `/pages`, {
        headers: this.headers,
        params: new HttpParams({
          fromString: strParams
        })
      })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadComponent(
    id: string,
    pageContext: PageContext,
    fields?: string
  ): Observable<any> {
    return this.http
      .get(this.getBaseEndPoint() + `/components/${id}`, {
        headers: this.headers,
        params: new HttpParams({
          fromString: this.getRequestParams(pageContext, fields)
        })
      })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadListComponents(
    idList: IdList,
    pageContext: PageContext,
    fields?: string,
    currentPage?: number,
    pageSize?: number,
    sort?: string
  ): Observable<any> {
    let strParams = this.getRequestParams(pageContext, fields);
    if (currentPage !== undefined) {
      strParams === ''
        ? (strParams = strParams + 'currentPage=' + currentPage)
        : (strParams = strParams + '&currentPage=' + currentPage);
    }
    if (pageSize !== undefined) {
      strParams = strParams + '&pageSize=' + pageSize;
    }
    if (sort !== undefined) {
      strParams = strParams + '&sort=' + sort;
    }

    return this.http
      .post(this.getBaseEndPoint() + `/components`, idList, {
        headers: this.headers,
        params: new HttpParams({
          fromString: strParams
        })
      })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  private getRequestParams(pageContext: PageContext, fields?: string) {
    let strParams = '';
    switch (pageContext.type) {
      case PageType.PRODUCT_PAGE: {
        strParams = 'productCode=' + pageContext.id;
        break;
      }
      case PageType.CATEGORY_PAGE: {
        strParams = 'categoryCode=' + pageContext.id;
        break;
      }
      case PageType.CATALOG_PAGE: {
        strParams = 'catalogCode=' + pageContext.id;
        break;
      }
    }

    if (fields !== undefined) {
      strParams === ''
        ? (strParams = strParams + 'fields=' + fields)
        : (strParams = strParams + '&fields=' + fields);
    }

    return strParams;
  }

  get baseUrl(): string {
    return this.config.server.baseUrl || '';
  }
}
