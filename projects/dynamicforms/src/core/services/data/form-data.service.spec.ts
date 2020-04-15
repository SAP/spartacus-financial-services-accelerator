import { I18nTestingModule } from '@spartacus/core';
import { TestBed } from '@angular/core/testing';

import { FormDataService } from './form-data.service';
import { YFormData, YFormDefinition } from './../../models/form-occ.models';
import { OccFormAdapter } from '../../../occ/adapters/form/occ-form.adapter';
import { Observable, of } from 'rxjs';
import * as fromAction from '../../store/actions';
import { Store, StoreModule } from '@ngrx/store';
import { reducerProvider, reducerToken } from '../../store/reducers';
import { StateWithFormDefinition } from '../../store/form-definition-state';
import { Type } from '@angular/core';

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

class MockOccYFormService {
  getFormData() {
    return mockData;
  }
  createFormData(yFormData: YFormData) {
    return of(mockData);
  }
  updateFormData(yFormData: YFormData) {
    return of(mockData);
  }
  getFormDefinition() {
    return mockDefinition;
  }
}

describe('FormDataService', () => {
  let service: FormDataService;
  let mockYFormService: MockOccYFormService;
  let store: Store<StateWithFormDefinition>;

  beforeEach(() => {
    mockYFormService = new MockOccYFormService();
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('formDefinition', reducerToken),
      ],
      providers: [
        FormDataService,
        reducerProvider,
        { provide: OccFormAdapter, useValue: mockYFormService },
      ],
    });

    service = TestBed.get(FormDataService);
    store = TestBed.get(Store as Type<Store<StateWithFormDefinition>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update form data', () => {
    spyOn(mockYFormService, 'updateFormData').and.callThrough();
    expect(service.saveFormData(mockFormData));
    expect(mockYFormService.updateFormData).toHaveBeenCalled();
  });

  it('should create form data', () => {
    spyOn(mockYFormService, 'createFormData').and.callThrough();
    expect(service.saveFormData(mockFormDataNew));
    expect(mockYFormService.createFormData).toHaveBeenCalled();
  });

  it('should get data', () => {
    expect(service.getFormData(mockFormData.id)).toEqual(mockData);
  });

  it('should get definition', () => {
    store.dispatch(new fromAction.LoadFormDefinitionSuccess(mockDefinition));
    let response;
    service
      .getFormDefinition()
      .subscribe(formDefinition => {
        response = formDefinition;
      })
      .unsubscribe();
    expect(response).toEqual(mockDefinition);
  });
});
