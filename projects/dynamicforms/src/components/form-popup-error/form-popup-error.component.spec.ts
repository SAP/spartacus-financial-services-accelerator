import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, BehaviorSubject } from 'rxjs';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { FormComponentService } from '../form-component.service';
import { FormPopupErrorComponent } from './form-popup-error.component';

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

export class MockFormComponentService {
  isPopulatedFormInvalidSource = new BehaviorSubject<boolean>(true);
  isPopulatedFormInvalid = of(false);
}

describe('FormPopupErrorComponent', () => {
  let component: FormPopupErrorComponent;
  let fixture: ComponentFixture<FormPopupErrorComponent>;
  let mockLanguageService: MockLanguageService;
  let mockFormComponentService: MockFormComponentService;
  let modalInstance: any;

  beforeEach(async(() => {
    mockLanguageService = new MockLanguageService();
    mockFormComponentService = new MockFormComponentService();

    TestBed.configureTestingModule({
      declarations: [FormPopupErrorComponent],
      imports: [ReactiveFormsModule, I18nTestingModule],
      providers: [
        {
          provide: LanguageService,
          useValue: mockLanguageService,
        },
        {
          provide: FormComponentService,
          useValue: mockFormComponentService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPopupErrorComponent);
    modalInstance = TestBed.inject(ModalService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
