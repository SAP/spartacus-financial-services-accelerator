import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OccConfig, RoutingService } from '@spartacus/core';
import { DeleteClaimDialogComponent } from '../delete-claim-dialog/delete-claim-dialog.component';
import { genericIcons } from '../../../../assets/icons/generic-icons';
import { ClaimService } from '../../../../core/my-account/facade';
import { StateWithMyAccount } from '../../../../core/my-account/store/my-account-state';

@Component({
  selector: 'fsa-claims',
  templateUrl: './claims.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimsComponent implements OnInit, OnDestroy {
  constructor(
    protected modalService: NgbModal,
    protected config: OccConfig,
    protected domSanitizer: DomSanitizer,
    protected claimService: ClaimService,
    protected routingService: RoutingService
  ) {}

  private subscription = new Subscription();
  claims$: Observable<StateWithMyAccount>;
  claimsLoaded$: Observable<boolean>;
  modalInstance: any;

  ngOnInit() {
    this.claimService.loadClaims();
    this.claims$ = this.claimService.getClaims();
    this.claimsLoaded$ = this.claimService.getLoaded();

    this.subscription.add(
      this.claimService
        .shouldReload()
        .pipe(
          map(_ => {
            this.claimService.loadClaims();
          })
        )
        .subscribe()
    );
  }

  deleteClaim(claimNumber: string) {
    this.openModal(claimNumber);
  }

  getImagelink() {
    return this.domSanitizer.bypassSecurityTrustUrl(genericIcons.naIcon);
  }

  private openModal(claimNumber: string) {
    this.modalInstance = this.modalService.open(DeleteClaimDialogComponent, {
      centered: true,
      size: 'lg',
    }).componentInstance;
    this.modalInstance.claimNumber = claimNumber;
  }

  getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  resumeClaim(claimNumber: string) {
    this.claimService.resumeClaim(claimNumber);
    this.subscription.add(
      this.claimService
        .getCurrentClaim()
        .pipe(
          map(claim => {
            if (claim.claimNumber === claimNumber) {
              this.routingService.go({
                cxRoute: claim.configurationSteps[0].pageLabelOrId,
              });
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
