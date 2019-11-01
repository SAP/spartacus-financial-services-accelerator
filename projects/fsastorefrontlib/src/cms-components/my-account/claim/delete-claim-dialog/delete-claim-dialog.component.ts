import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaimService } from '../../../../core/my-account/services/claim.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '@spartacus/core';

@Component({
  selector: 'fsa-deleted-claim-dialog',
  templateUrl: './delete-claim-dialog.component.html',
})
export class DeleteClaimDialogComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private service: ClaimService,
    protected fb: FormBuilder,
    protected auth: AuthService
  ) {}

  form: FormGroup = this.fb.group({});
  private subscription: Subscription;
  private user_id: string;
  private claimNumber: string;

  ngOnInit() {
    this.subscription = this.auth.getUserToken().subscribe(userData => {
      if (userData && userData.userId) {
        this.user_id = userData.userId;
      }
    });

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
    this.service.removeClaim(this.user_id, this.claimNumber);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
