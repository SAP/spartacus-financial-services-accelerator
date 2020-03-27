import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
import { OccCheckoutAdapter } from './occ-checkout.adapter';

const userId = 'userId';
const cartId = 'cartId';
const identificationType = 'video_identification';

const usersEndpoint = '/users';
const cartsEndpoint = '/carts';

const MockOccModuleConfig: OccConfig = {
  context: {
    baseSite: [''],
  },
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('OccCheckoutAdapter', () => {
  let service: OccCheckoutAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccCheckoutAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(OccCheckoutAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('setIdentificationType', () => {
    it('should set user identification type', async(() => {
      service
        .setIdentificationType(identificationType, cartId, userId)
        .subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              `/${cartId}` +
              '/userIdentification' &&
          req.params.append('identificationType', identificationType) &&
          req.method === 'PATCH'
        );
      }, `PATCH method and url`);
    }));
  });
});
