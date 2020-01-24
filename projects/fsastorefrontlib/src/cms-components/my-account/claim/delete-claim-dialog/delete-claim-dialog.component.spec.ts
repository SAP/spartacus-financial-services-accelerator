import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  I18nTestingModule,
  OCC_USER_ID_CURRENT,
  AuthService,
} from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { DeleteClaimDialogComponent } from './delete-claim-dialog.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaimService } from './../../../../core/my-account/services/claim.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

class MockModalService {
  dismissActiveModal(): void {}
}

let formGroup = {};

class MockFormBuilder {
  group() {
    return new FormGroup(formGroup);
  }
}

class MockAuthService {
  getOccUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

class MockClaimService {
  removeClaim() {}
}

describe('DeleteClaimDialogComponent', () => {
  let component: DeleteClaimDialogComponent;
  let fixture: ComponentFixture<DeleteClaimDialogComponent>;
  let claimService: MockClaimService;
  let authService: MockAuthService;

  beforeEach(async(() => {
    authService = new MockAuthService();
    claimService = new MockClaimService();

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [DeleteClaimDialogComponent],
      providers: [
        {
          provide: ModalService,
          useClass: MockModalService,
        },
        {
          provide: ClaimService,
          useValue: claimService,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
        { provide: NgbActiveModal, useValue: { open: () => {} } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteClaimDialogComponent);
    component = fixture.componentInstance;
    claimService = TestBed.get(ClaimService as Type<ClaimService>);
    fixture.detectChanges();
  });

  it('should create delete claim popup', () => {
    formGroup = {
      claimNumber: '000001',
    };
    expect(component).toBeTruthy();
  });

  it('should be able to delete claim', () => {
    spyOn(claimService, 'removeClaim').and.stub();
    component.deleteClaim();
    expect(claimService.removeClaim).toHaveBeenCalled();
  });
});
