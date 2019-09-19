import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { default as autoOptions } from './auto-options';


@Injectable()
export class FsHttpInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'GET' && request.url.includes('examplewebservices')) {
      return this.mockedResponse(request);
    }
    return next.handle(request);
  }

  ok(body: any) {
    return of(new HttpResponse({status: 200, body: body}));
  }

  mockedResponse(request: HttpRequest<any>) {
    const urlArray = request.url.split('/');
    const parameters = request.url.includes('?');
    if (!parameters) {
      return this.setInitialFormControlValues(new Array(urlArray[urlArray.length - 1]));
    } else {
      const parameterValPosition = request.url.lastIndexOf('=');
      const parameterVal = request.url.substring(parameterValPosition + 1, request.url.length);
      switch (true) {
        case request.url.includes('/models?make'):
          return this.getDropdownValues('makes.model', parameterVal);
          break;
        case request.url.includes('/types?make'):
          return this.getDropdownValues('makes.model.type', parameterVal);
          break;
        case request.url.includes('/years?make'):
          return this.getDropdownValues('makes.model.type.year', parameterVal);
          break;
      }
    }
  }

  setInitialFormControlValues(nodes: any): any {
    let result = null;
    const optionsArray = [];
    if (nodes.length === 1) {
      result = autoOptions[nodes[0]];
    }
    if (result) {
      result.forEach((node) => {
        optionsArray.push(node.code);
      });
    }
    return this.ok(optionsArray);
  }

  getDropdownValues(nodesForParsing: any, val: string): any {
    let result = new Array(autoOptions);
    nodesForParsing = nodesForParsing.split('.');
    const optionsArray = [];
    if (nodesForParsing.length > 1) {
      for (let i = 0; i < nodesForParsing.length; i += 1) {
        const extractedResults = this.getNodes(result, i, val, nodesForParsing);
        if (nodesForParsing.length - 1 === i) {
          extractedResults.forEach((resultElement) => {
            optionsArray.push(resultElement.code ? resultElement.code : resultElement);
          });
        } else {
          result = extractedResults;
        }
      }
      return this.ok(optionsArray);
    }
  }

  private getNodes(result: any, i: number, value: string, nodesForParsing: []): any {
    const values = [];

    function pushElements(obj) {
      if (obj.length) {
        obj.forEach((el) => {
          values.push(el);
        });
      } else {
        values.push(obj);
      }
    }

    for (let j = 0; j < result.length; j += 1) {
      const obj = (result[j])[nodesForParsing[i]];
      if (obj && result[j].code === value) {
        pushElements(obj);
        break;
      } else if (nodesForParsing.length - 1 > i && obj) {
        pushElements(obj);
      }
    }
    return values;
  }
}
