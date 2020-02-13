import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
import { OccAgentAdapter } from './occ-agent.adapter';

const category = 'insurances_property_renters';
const id = 'test@agent.com';

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

const searchQuery = 'auto';
const pageNumber = 1;

describe('OccAgentAdapter', () => {
  let adapter: OccAgentAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccAgentAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    adapter = TestBed.get(OccAgentAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  describe('getAgentsByCategory', () => {
    it('get Agents By Category', async(() => {
      adapter.getAgentsByCategory(category).subscribe(res => {});
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === '/agents' &&
          req.params.append('categoryCode', category) &&
          req.method === 'GET'
        );
      }, `GET method and url`);
    }));
  });

  describe('getAgentByID', () => {
    it('gets Agent By ID', async(() => {
      adapter.getAgentByID(id).subscribe(res => {});
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === '/agents' + '/' + id + '?fields=DEFAULT';
      }, `GET url`);
    }));
  });

  describe('searchAgents', () => {
    it('search Agents By Query String', async(() => {
      adapter.getAgentsByQuery(searchQuery, pageNumber).subscribe(res => {});
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === '/agents' && req.method === 'GET';
      }, `GET method and url`);
    }));
  });
});
