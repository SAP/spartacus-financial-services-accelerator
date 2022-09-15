import { TestBed } from '@angular/core/testing';
import {
  createFeatureSelector,
  MemoizedSelector,
  StoreModule,
} from '@ngrx/store';
import { StatePersistenceService } from '@spartacus/core';
import { of } from 'rxjs';
import * as fromReducers from '../store/reducers/index';
import * as fromActions from '../store/actions/index';
import { FormPersistenceService } from './form-persistance.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { FormsState, FORM_FEATURE, StateWithForm } from '../store/state';

export const getFormsState: MemoizedSelector<
  StateWithForm,
  FormsState
> = createFeatureSelector<FormsState>(FORM_FEATURE);
const blob1 = new Blob([''], { type: 'application/pdf' });
blob1['lastModifiedDate'] = '';
blob1['name'] = 'testFile1';
const mockFile = <File>blob1;
const mockFiles = {
  files: [mockFile],
};
const mockFileState = {
  formDefinition: {
    loaded: false,
    content: {},
  },
  formData: {
    loaded: false,
    content: {},
  },
  uploadedFiles: {
    loaded: true,
    content: mockFiles,
  },
};
const mockFormState = { [FORM_FEATURE]: mockFileState };

describe('FormPersistenceService', () => {
  let service: FormPersistenceService;
  let persistenceService: StatePersistenceService;
  let actions$ = of({ type: fromActions.SetUploadedFiles });
  let store: MockStore<StateWithForm>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(FORM_FEATURE, fromReducers.getReducers()),
      ],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore(),
        FormPersistenceService,
        StatePersistenceService,
      ],
    });

    service = TestBed.inject(FormPersistenceService);
    persistenceService = TestBed.inject(StatePersistenceService);
    store = TestBed.inject(MockStore);
    store.setState(mockFormState);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(persistenceService, 'syncWithStorage').and.stub();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should sync state with storage', () => {
    service.initSync();
    expect(persistenceService.syncWithStorage).toHaveBeenCalled();
  });

  it('should get uploaded files', () => {
    service['getUploadedFiles']()
      .subscribe(state => expect(state.files.length).toBe(1))
      .unsubscribe();
  });

  it('should read state', () => {
    service['onRead'](mockFiles);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = service['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();
    service.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
