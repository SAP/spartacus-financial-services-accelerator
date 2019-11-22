import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
import { OccAgentService } from './agent.service';

const category = 'insurances_property_renters';

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

describe('OccAgentService', () => {
  let service: OccAgentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccAgentService,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    service = TestBed.get(OccAgentService);
    httpMock = TestBed.get(HttpTestingController);
  });

  describe('getAgentsByCategory', () => {
    it('get Agents By Category', async(() => {
      service.getAgentsByCategory(category).subscribe(res => {});
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === '/agents' &&
          req.params.append('categoryCode', category) &&
          req.method === 'GET'
        );
      }, `GET method and url`);
    }));
  });

  describe('searchAgents', () => {
    it('search Agents By Query String', async(() => {
      service.searchAgents(searchQuery, pageNumber).subscribe(res => {});
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === '/agents/search' &&
          req.method === 'GET'
        );
      }, `GET method and url`);
    }));
  });
});
