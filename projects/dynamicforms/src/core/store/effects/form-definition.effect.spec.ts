import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { GlobalMessage, GlobalMessageService } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { FormConnector } from '../../connectors/form-connector';
import * as fromActions from '../actions';
import * as fromUserReducers from './../../store/reducers/index';
import * as fromEffects from './form-definition.effect';

const formId = 'formId';

const formDefinition = {
  formId: formId,
};

class MockFormConnector {
  getFormDefinition() {
    return of(formDefinition);
  }
}

class GlobalMessageServiceMock {
  remove(): void {}
  add(_message: GlobalMessage): void {}
}

describe('Form Definition Effects', () => {
  let actions$: Observable<fromActions.FormDefinitionAction>;
  let effects: fromEffects.FormDefinitionEffects;
  let mockFormConnector: MockFormConnector;

  beforeEach(() => {
    mockFormConnector = new MockFormConnector();
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('form', fromUserReducers.getReducers()),
      ],
      providers: [
        {
          provide: FormConnector,
          useValue: mockFormConnector,
        },
        {
          provide: GlobalMessageService,
          useClass: GlobalMessageServiceMock,
        },
        fromEffects.FormDefinitionEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.get(fromEffects.FormDefinitionEffects as Type<
      fromEffects.FormDefinitionEffects
    >);
  });

  describe('loadFormDefinition$', () => {
    it('should load form definition', () => {
      const action = new fromActions.LoadFormDefinition({
        formId: formId,
      });
      const completion = new fromActions.LoadFormDefinitionSuccess(
        formDefinition
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadFormDefinition$).toBeObservable(expected);
    });
  });

  it('should fail to load form definition', () => {
    spyOn(mockFormConnector, 'getFormDefinition').and.returnValue(
      throwError('Error')
    );
    const action = new fromActions.LoadFormDefinition({
      formId: formId,
    });
    const completion = new fromActions.LoadFormDefinitionFail(
      JSON.stringify('Error')
    );
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });
    expect(effects.loadFormDefinition$).toBeObservable(expected);
  });
});
