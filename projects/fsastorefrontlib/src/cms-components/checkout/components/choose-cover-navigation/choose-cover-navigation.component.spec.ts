import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {
  FormDataService,
  FormDataStorageService,
  YFormData,
} from '@spartacus/dynamicforms';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { ChooseCoverNavigationComponent } from './choose-cover-navigation.component';

const formDataId = 'formDataId';
const category = 'test_category';
const mockParams = {
  formCode: category,
};
const formData: YFormData = {
  id: formDataId,
  type: 'DATA',
  content:
    '{"testContent":{"tripDestination":"Europe","tripStartDate":"2022-02-02"}}',
};

class MockActivatedRoute {
  params = of(mockParams);
}

class MockFormDataStorageService {
  setFormDataToLocalStorage() {}
  getFormDataIdByCategory() {
    return formDataId;
  }
}

class MockFormDataService {
  getSubmittedForm() {
    return of(formData);
  }
  submit() {}
}

describe('ChooseCoverNavigationComponent', () => {
  let component: ChooseCoverNavigationComponent;
  let fixture: ComponentFixture<ChooseCoverNavigationComponent>;
  let mockFormDataStorageService: FormDataStorageService;
  let formDataService: FormDataService;
  let routingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [ChooseCoverNavigationComponent],
        providers: [
          {
            provide: FormDataService,
            useClass: MockFormDataService,
          },
          {
            provide: RoutingService,
            useValue: { go: jasmine.createSpy() },
          },
          {
            provide: ActivatedRoute,
            useClass: MockActivatedRoute,
          },
          {
            provide: FormDataStorageService,
            useClass: MockFormDataStorageService,
          },
        ],
      }).compileComponents();
      mockFormDataStorageService = TestBed.inject(FormDataStorageService);
      formDataService = TestBed.inject(FormDataService);
      routingService = TestBed.inject(RoutingService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCoverNavigationComponent);
    component = fixture.componentInstance;
    component.categoryCode = 'test_category';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate next when form is submitted', () => {
    component.navigateNext();
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should not navigate next when form data is not submitted', () => {
    spyOn(formDataService, 'getSubmittedForm').and.returnValue(of(null));
    component.navigateNext();
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should create new form when form data id does not exist in storage', () => {
    spyOn(
      mockFormDataStorageService,
      'getFormDataIdByCategory'
    ).and.returnValue(undefined);
    spyOn(formDataService, 'submit').and.callThrough();

    component.navigateNext();
    expect(formDataService.submit).toHaveBeenCalledWith({});
  });
});
