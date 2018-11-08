import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaimsService } from '../../../services/claims.service';
import { AuthService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'fsa-delete-claim-dialog',
  templateUrl: './delete-claim-dialog.component.html',
  styleUrls: ['./delete-claim-dialog.component.scss']
})
export class DeleteClaimDialogComponent implements OnInit {
  claimNumber;

  constructor(
    public activeModal: NgbActiveModal,
    private service: ClaimsService,
    protected fb: FormBuilder,
    protected auth: AuthService
  ) {}

  private user_id: string;
  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.auth.userToken$.subscribe(userData => {
      if (userData && userData.userId) {
        this.user_id = userData.userId;
      }
    });
  }

  deleteClaim() {
    this.service.removeClaim(this.user_id, this.claimNumber);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
