import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { hot, cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { OccStoreFinderService } from '../../../occ/store/store-finder.service';
import { OccConfig } from '@spartacus/core';
import { OccE2eConfigurationService } from '../../../occ/e2e/e2e-configuration-service';

import * as fromEffects from './view-all-stores.effect';
import * as fromActions from '../actions/view-all-stores.action';

const MockOccModuleConfig: OccConfig = {
  server: {
    baseUrl: '',
    occPrefix: ''
  }
};

describe('ViewAllStores Effects', () => {
  let actions$: Observable<any>;
  let service: OccStoreFinderService;
  let effects: fromEffects.ViewAllStoresEffect;

  const searchResult: any = { stores: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccStoreFinderService,
        OccE2eConfigurationService,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        fromEffects.ViewAllStoresEffect,
        provideMockActions(() => actions$)
      ]
    });

    service = TestBed.get(OccStoreFinderService);
    effects = TestBed.get(fromEffects.ViewAllStoresEffect);

    spyOn(service, 'storesCount').and.returnValue(of(searchResult));
  });

  describe('viewAllStores$', () => {
    it('should return searchResult from ViewAllStoresSuccess', () => {
      const action = new fromActions.ViewAllStores();
      const completion = new fromActions.ViewAllStoresSuccess(searchResult);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.viewAllStores$).toBeObservable(expected);
    });
  });
});
