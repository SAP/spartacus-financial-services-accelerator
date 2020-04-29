import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { FormAdapter } from '../../connectors/form.adapter';
import * as fromAction from '../../store/actions';
import { reducerProvider, reducerToken } from '../../store/reducers';
import { YFormData, YFormDefinition } from './../../models/form-occ.models';
import { StateWithForm } from './../../store/state';
import { FormDataService } from './form-data.service';

const mockData: Observable<YFormData> = of({
  formDefinitionId: 'formDefinitionId',
  id: 'formDataId',
  content: '{test: test}',
});

const mockDefinition: YFormDefinition = {
  formId: 'formDefinitionId',
  content: '{testDef: testDef}',
  applicationId: 'applicationId',
};

const mockFormData: YFormData = {
  id: 'formDataId',
  content: 'test',
  formDefinition: {
    formId: 'formDefinitionId',
    applicationId: 'applicationId',
  },
};

const mockFormDataNew: YFormData = {
  content: 'test',
  formDefinition: {
    formId: 'formDefinitionId',
    applicationId: 'applicationId',
  },
};

class MockOccFormAdapter {
  getFormData() {
    return mockData;
  }
  saveFormData(yFormData: YFormData) {
    return of(mockData);
  }
  // updateFormData(yFormData: YFormData) {
  //   return of(mockData);
  // }
  getFormDefinition() {
    return mockDefinition;
  }
}

describe('FormDataService', () => {
  let service: FormDataService;
  let mockFormAdapter: MockOccFormAdapter;
  let store: Store<StateWithForm>;

  beforeEach(() => {
    mockFormAdapter = new MockOccFormAdapter();
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('form', reducerToken),
      ],
      providers: [
        FormDataService,
        reducerProvider,
        { provide: FormAdapter, useValue: mockFormAdapter },
      ],
    });

    service = TestBed.get(FormDataService);
    store = TestBed.get(Store as Type<Store<StateWithForm>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should update form data', () => {
  //   spyOn(mockFormAdapter, 'updateFormData').and.callThrough();
  //   expect(service.saveFormData(mockFormData));
  //   expect(mockFormAdapter.updateFormData).toHaveBeenCalled();
  // });

  // it('should create form data', () => {
  //   spyOn(mockFormAdapter, 'createFormData').and.callThrough();
  //   expect(service.saveFormData(mockFormDataNew));
  //   expect(mockFormAdapter.createFormData).toHaveBeenCalled();
  // });

  // it('should get data', () => {
  //   expect(service.getFormData(mockFormData.id)).toEqual(mockData);
  // });

  it('should get definition', () => {
    store.dispatch(new fromAction.LoadFormDefinitionSuccess(mockDefinition));
    let response;
    service
      .getFormDefinition()
      .subscribe(formDefinition => {
        console.log(formDefinition);
        response = formDefinition;
      })
      .unsubscribe();
    expect(response).toEqual(mockDefinition);
  });
});
