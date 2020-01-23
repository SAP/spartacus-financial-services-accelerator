import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaimService } from '../../../../core/my-account/services/claim.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@spartacus/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'fsa-deleted-claim-dialog',
  templateUrl: './delete-claim-dialog.component.html',
})
export class DeleteClaimDialogComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private service: ClaimService,
    protected fb: FormBuilder,
    protected authService: AuthService
  ) {}

  form: FormGroup = this.fb.group({});
  claimNumber: string;

  ngOnInit() {
    if (!this.form.controls[this.claimNumber]) {
      this.form.setControl(
        this.claimNumber,
        this.createClaimFormGroup(this.claimNumber)
      );
    }
  }

  private createClaimFormGroup(claimNumber) {
    return this.fb.group({
      claimNumber: claimNumber,
    });
  }

  deleteClaim() {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        if (occUserId) {
          this.service.removeClaim(occUserId, this.claimNumber);
        }
      })
      .unsubscribe();
  }
}
