import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaimService } from '../../../services/claim.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '@spartacus/storefront';

@Component({
  selector: 'fsa-deleted-claim-dialog',
  templateUrl: './delete-claim-dialog.component.html',
  styleUrls: ['./delete-claim-dialog.component.scss']
})
export class DeleteClaimDialogComponent implements OnInit {

  form: FormGroup = this.fb.group({});
  private subscription: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    private service: ClaimService,
    protected fb: FormBuilder,
    protected auth: AuthService
  ) {}

  private user_id: string;
  private claimNumber: string;

  ngOnInit() {
    this.subscription = this.auth.userToken$.subscribe(userData => {
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
      claimNumber: claimNumber
    });
  }

  deleteClaim() {
    this.service.removeClaim(this.user_id, this.claimNumber);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
