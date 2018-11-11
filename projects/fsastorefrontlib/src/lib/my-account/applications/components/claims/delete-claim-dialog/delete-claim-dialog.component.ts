import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaimsService } from '../../../services/claims.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Claim } from '../claims.component';
import { Subscription } from 'rxjs';
import { AuthService } from '@spartacus/storefront';

@Component({
  selector: 'fsa-deleted-claim-dialog',
  templateUrl: './delete-claim-dialog.component.html',
  styleUrls: ['./delete-claim-dialog.component.scss']
})
export class DeleteClaimDialogComponent implements OnInit {
  private user_id: string;
  private claimNumber: string;
  claim$: Claim;
  form: FormGroup = this.fb.group({});
  private subscription: Subscription;


  constructor(
    public activeModal: NgbActiveModal,
    private service: ClaimsService,
    protected fb: FormBuilder,
    protected auth: AuthService
  ) {}

  ngOnInit() {
    this.subscription = this.auth.userToken$.subscribe(userData => {
      if (userData && userData.userId) {
        this.user_id = userData.userId;
      }
    });

    if (!this.form.controls[this.claim$.claimNumber]) {
      this.form.setControl(
        this.claim$.claimNumber,
        this.createClaimFormGroup(this.claim$)
      );
    }
  }

  private createClaimFormGroup(claim) {
    return this.fb.group({
      claimNumber: claim.claimNumber
    });
  }

  deleteClaim() {
    this.service.removeClaim(this.user_id, this.claim$.claimNumber);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
