import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserIdService } from '@spartacus/core';
import { take } from 'rxjs/operators';
import { ClaimService } from '../../../../core/my-account/facade/claim.service';

@Component({
  selector: 'cx-fs-deleted-claim-dialog',
  templateUrl: './delete-claim-dialog.component.html',
})
export class DeleteClaimDialogComponent implements OnInit {
  constructor(
    protected service: ClaimService,
    protected fb: FormBuilder,
    protected userIdService: UserIdService,
    public activeModal: NgbActiveModal
  ) {}

  form: FormGroup = this.fb.group({});
  claimNumber: string;

  ngOnInit() {
    this.form.setControl(
      this.claimNumber,
      this.createClaimFormGroup(this.claimNumber)
    );
  }

  private createClaimFormGroup(claimNumber) {
    return this.fb.group({
      claimNumber: claimNumber,
    });
  }

  deleteClaim() {
    this.userIdService
      .getUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        if (occUserId) {
          this.service.removeClaim(occUserId, this.claimNumber);
        }
      })
      .unsubscribe();
  }
}
