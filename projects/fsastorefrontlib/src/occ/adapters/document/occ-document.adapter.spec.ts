import { HttpClient } from '@angular/common/http';
import { OccEndpointsService } from '@spartacus/core';
import { of } from 'rxjs';
import { OccDocumentAdapter } from './occ-document.adapter';

const userId = 'userId';
const documentCodes = 'DOC0000001,DOC0000002';
const signStatus = true;

describe('OccDocumentAdapter', () => {
  let adapter: OccDocumentAdapter;
  let occEndpointServiceSpy: jasmine.SpyObj<OccEndpointsService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    occEndpointServiceSpy = jasmine.createSpyObj('OccEndpointsService', [
      'buildUrl',
    ]);

    adapter = new OccDocumentAdapter(httpClientSpy, occEndpointServiceSpy);
  });

  it('should check if all services are injected', () => {
    expect(adapter).toBeTruthy();
    expect(occEndpointServiceSpy).toBeTruthy();
    expect(httpClientSpy).toBeTruthy();
  });

  it('should return expected signDocuments (HttpClient called once)', (done: DoneFn) => {
    const mockedResponse = [
      { id: 1, name: 'DOC0000001' },
      { id: 2, name: 'DOC0000002' },
    ];

    httpClientSpy.post.and.returnValue(of(mockedResponse));

    adapter.signDocuments(userId, documentCodes, signStatus).subscribe({
      next: res => {
        expect(res).toEqual(mockedResponse);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.post.calls.count()).toBe(1);
  });
});
