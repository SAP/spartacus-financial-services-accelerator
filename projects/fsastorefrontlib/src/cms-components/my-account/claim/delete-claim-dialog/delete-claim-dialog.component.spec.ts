import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  I18nTestingModule,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ClaimService } from '../../../../core/my-account/facade/claim.service';
import { DeleteClaimDialogComponent } from './delete-claim-dialog.component';

class MockLaunchDialogService {
  closeDialog(reason: String): void {}
}

class MockUserIdService {
  getUserId(): Observable<string> {
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
  let userIdService: UserIdService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, I18nTestingModule],
        declarations: [DeleteClaimDialogComponent],
        providers: [
          {
            provide: LaunchDialogService,
            useClass: MockLaunchDialogService,
          },
          {
            provide: ClaimService,
            useClass: MockClaimService,
          },
          {
            provide: UserIdService,
            useClass: MockUserIdService,
          },
          { provide: NgbActiveModal, useValue: { open: () => {} } },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteClaimDialogComponent);
    component = fixture.componentInstance;
    claimService = TestBed.inject(ClaimService);
    userIdService = TestBed.inject(UserIdService);
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
    spyOn(userIdService, 'getUserId').and.returnValue(of(null));
    component.deleteClaim();
  });
});
