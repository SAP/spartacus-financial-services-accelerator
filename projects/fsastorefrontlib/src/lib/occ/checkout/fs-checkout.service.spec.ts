import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
import { OccFSCheckoutService } from './fs-checkout.service';

const userId = 'userId';
const cartId = 'cartId';
const identificationType = 'video_identification';

const usersEndpoint = '/users';
const cartsEndpoint = '/carts';

const MockOccModuleConfig: OccConfig = {
    context: {
        baseSite: [
            ''
        ]
    },
    backend: {
        occ: {
            baseUrl: '',
            prefix: ''
        }
    }
};

describe('OccFSCheckoutService', () => {
    let service: OccFSCheckoutService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule],
            providers: [
                OccFSCheckoutService,
                { provide: OccConfig, useValue: MockOccModuleConfig }
            ]
        });

        service = TestBed.get(OccFSCheckoutService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('setIdentificationType', () => {
        it('should set user identification type', async(() => {
            service.setIdentificationType(identificationType, cartId, userId).subscribe();
            httpMock.expectOne((req: HttpRequest<any>) => {
                return (
                    req.url === usersEndpoint + `/${userId}` + cartsEndpoint + `/${cartId}` + '/user-identification' &&
                    req.params.append('identificationType', identificationType) &&
                    req.method === 'PUT'
                );
            }, `PUT method and url`);
        }));
    });
});
