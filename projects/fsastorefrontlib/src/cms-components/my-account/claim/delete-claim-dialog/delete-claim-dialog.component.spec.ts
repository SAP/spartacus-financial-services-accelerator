import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  AuthService,
  I18nTestingModule,
  OCC_USER_ID_CURRENT,
} from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ClaimService } from '../../../../core/my-account/facade/claim.service';
import { DeleteClaimDialogComponent } from './delete-claim-dialog.component';

class MockModalService {
  dismissActiveModal(): void {}
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
  let claimService: ClaimService;
  let authService: MockAuthService;

  beforeEach(async(() => {
    authService = new MockAuthService();

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
    claimService = TestBed.inject(ClaimService);
    fixture.detectChanges();
  });

  it('should create delete claim popup', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to delete claim', () => {
    spyOn(claimService, 'removeClaim').and.stub();
    component.deleteClaim();
    expect(claimService.removeClaim).toHaveBeenCalled();
  });

  it('should not be able to delete claim', () => {
    spyOn(claimService, 'removeClaim').and.stub();
    spyOn(authService, 'getOccUserId').and.returnValue(of(null));
    component.deleteClaim();
  });
});
