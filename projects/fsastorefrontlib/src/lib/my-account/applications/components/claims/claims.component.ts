import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ClaimsService } from '../../services/claims.service';
import { OccConfig } from '@spartacus/core';
import { AuthService } from '@spartacus/storefront';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteClaimDialogComponent } from './delete-claim-dialog/delete-claim-dialog.component';

@Component({
  selector: 'fsa-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  modalInstance;
  form: FormGroup = this.fb.group({});

  constructor(
    private service: ClaimsService,
    private config: OccConfig,
    private auth: AuthService,
    private modalService: NgbModal,
    protected fb: FormBuilder

  ) { }

  claims$: Observable<any>;
  claim$: Observable<any>;

  private user_id: string;

  noClaimsText = 'You have no Claims!';

  ngOnInit() {
    this.subscription = this.auth.userToken$.subscribe(userData => {
      if (userData && userData.userId) {
        this.user_id = userData.userId;
      }
    });

    this.claims$ = this.service.getClaims(this.user_id);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public getBaseUrl() {
    return this.config.server.baseUrl || '';
  }

  deleteClaim(claimNumber: string) {
    console.log(claimNumber);
    this.openModal(claimNumber);
    delete this.form.controls[claimNumber];
  }

  private openModal(claimNumber: string) {
    this.modalInstance = this.modalService.open(DeleteClaimDialogComponent, {
      centered: true,
      size: 'lg'
    }).componentInstance;
    this.modalInstance.entry$ = this.claim$;
    this.modalInstance.claimNumber = claimNumber;
  }
}
