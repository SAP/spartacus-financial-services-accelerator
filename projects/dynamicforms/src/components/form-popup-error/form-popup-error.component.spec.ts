import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, BehaviorSubject } from 'rxjs';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { FormComponentService } from '../form-component.service';
import { FormPopupErrorComponent } from './form-popup-error.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

export class MockNgbModalRef {
  result: Promise<any> = new Promise((resolve, reject) => resolve('x'));
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
  const mockModalRef: MockNgbModalRef = new MockNgbModalRef();
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
        {
          provide: NgbActiveModal,
          useValue: {
            open: () => {},
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPopupErrorComponent);
    modalInstance = TestBed.inject(ModalService);
    spyOn(modalInstance, 'open').and.returnValue(mockModalRef);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to open dialog', () => {
    mockFormComponentService.isPopulatedFormInvalidSource.next(true);
    fixture.detectChanges();
    expect(modalInstance.open).toHaveBeenCalled();
  });
});
