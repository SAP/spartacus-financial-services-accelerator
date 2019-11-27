import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNavigationComponent } from './form-navigation.component';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { YFormData, FormDataService } from '@fsa/dynamicforms';
import { ActivatedRoute } from '@angular/router';

const mockedFormData: YFormData = {};

export class MockFormDataService {
  getSubmittedFrom() {
    return of(mockedFormData);
  }
}

class MockActivatedRoute {
  params = of();
}

describe('FormNavigationComponent', () => {
  let component: FormNavigationComponent;
  let fixture: ComponentFixture<FormNavigationComponent>;
  let mockFormDataService: MockFormDataService;

  beforeEach(async(() => {
    mockFormDataService = new MockFormDataService();
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        {
          provide: FormDataService,
          useValue: mockFormDataService,
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute,
        },
      ],
      declarations: [FormNavigationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
