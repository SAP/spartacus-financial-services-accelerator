import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { of } from 'rxjs';

import { AuthModuleConfig } from '../auth-module.config';
import { AuthService } from '../facade/auth.service';
import { ClientToken } from './../models/token-types.model';
import { InterceptorUtil } from '../../occ/utils/interceptor-util';

import { ClientTokenInterceptor } from './client-token.interceptor';

const testToken: ClientToken = {
  access_token: 'abc-123',
  token_type: 'bearer',
  expires_in: 1000,
  scope: ''
};

const authServiceMock = {
  clientToken$: of(testToken)
};

const MockAuthModuleConfig: AuthModuleConfig = {
  server: {
    baseUrl: 'https://localhost:9002',
    occPrefix: '/rest/v2/'
  },

  site: {
    baseSite: 'electronics'
  }
};

describe('ClientTokenInterceptor', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthModuleConfig, useValue: MockAuthModuleConfig },
        { provide: AuthService, useValue: authServiceMock },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ClientTokenInterceptor,
          multi: true
        }
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  describe('Client Token', () => {
    it('Should only add token to specified requests', inject(
      [HttpClient],
      (http: HttpClient) => {
        http
          .get('https://localhost:9002/rest/v2/electronics/test')
          .subscribe(result => {
            expect(result).toBeTruthy();
          });
        let mockReq = httpMock.expectOne(
          'https://localhost:9002/rest/v2/electronics/test'
        );
        let authHeader = mockReq.request.headers.get('Authorization');
        expect(authHeader).toBe(null);

        spyOn<any>(InterceptorUtil, 'getInterceptorParam').and.returnValue(
          true
        );
        http
          .post(
            'https://localhost:9002/rest/v2/electronics/somestore/forgottenpasswordtokens',
            { userId: 1 }
          )
          .subscribe(result => {
            expect(result).toBeTruthy();
          });

        mockReq = httpMock.expectOne(
          'https://localhost:9002/rest/v2/electronics/somestore/forgottenpasswordtokens'
        );
        authHeader = mockReq.request.headers.get('Authorization');
        expect(authHeader).toBe(
          `${testToken.token_type} ${testToken.access_token}`
        );
      }
    ));

    it(`should not add an 'Authorization' token to a request if it already has one`, inject(
      [HttpClient],
      (http: HttpClient) => {
        const headers = { Authorization: 'bearer 123' };
        http
          .get('/somestore/forgottenpasswordtokens', { headers })
          .subscribe(result => {
            expect(result).toBeTruthy();
          });

        const mockReq = httpMock.expectOne(
          '/somestore/forgottenpasswordtokens'
        );
        const authHeader = mockReq.request.headers.get('Authorization');
        expect(authHeader).toBe(headers.Authorization);
      }
    ));
  });
});
