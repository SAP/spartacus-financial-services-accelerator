import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, BehaviorSubject } from 'rxjs';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { FormComponentService } from '../form-component.service';
import { FormPopupErrorComponent } from './form-popup-error.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { ElementRef, ViewContainerRef } from '@angular/core';

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

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef
  ) {
    return of();
  }
  closeDialog(_reason: string): void {}
}

describe('FormPopupErrorComponent', () => {
  let component: FormPopupErrorComponent;
  let fixture: ComponentFixture<FormPopupErrorComponent>;
  let mockLanguageService: MockLanguageService;
  let mockFormComponentService: MockFormComponentService;
  const mockModalRef: MockNgbModalRef = new MockNgbModalRef();
  let launchDialogInstance: any;

  beforeEach(
    waitForAsync(() => {
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
            provide: LaunchDialogService,
            useClass: MockLaunchDialogService,
          },
          {
            provide: NgbActiveModal,
            useValue: {
              open: () => {},
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPopupErrorComponent);
    launchDialogInstance = TestBed.inject(LaunchDialogService);
    spyOn(launchDialogInstance, 'openDialog').and.callThrough();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to open dialog', () => {
    mockFormComponentService.isPopulatedFormInvalidSource.next(true);
    fixture.detectChanges();
    expect(launchDialogInstance.openDialog).toHaveBeenCalled();
  });
});
