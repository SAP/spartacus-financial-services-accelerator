import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OccConfig, RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { genericIcons } from '../../../../assets/icons/generic-icons';
import { ClaimService } from '../../../../core/my-account/facade';
import { StateWithMyAccount } from '../../../../core/my-account/store/my-account-state';
import { DeleteClaimDialogComponent } from '../delete-claim-dialog/delete-claim-dialog.component';
//import { ModalService } from '@spartacus/storefront';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';


@Component({
  selector: 'cx-fs-claims',
  templateUrl: './claims.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimsComponent implements OnInit, OnDestroy {
  constructor(
    //protected modalService: ModalService,
    protected launchDialogService: LaunchDialogService,
    protected config: OccConfig,
    protected domSanitizer: DomSanitizer,
    protected claimService: ClaimService,
    protected routingService: RoutingService,
    protected vcr: ViewContainerRef
  ) {}

  @ViewChild('element') element: ElementRef;

  private subscription = new Subscription();
  claims$: Observable<StateWithMyAccount>;
  claimsLoaded$: Observable<boolean>;
  baseUrl: string;

  ngOnInit() {
    this.claimService.loadClaims();
    this.claims$ = this.claimService.getClaims();
    this.claimsLoaded$ = this.claimService.getLoaded();
    this.baseUrl = this.config.backend.occ.baseUrl || '';

    this.subscription.add(
      this.claimService
        .shouldReload()
        .pipe(
          map(reload => {
            if (reload) {
              this.claimService.loadClaims();
            }
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

  // private openModal(claimNumber: string) {
  //   this.modalInstance = this.modalService.open(DeleteClaimDialogComponent, {
  //     centered: true,
  //     size: 'lg',
  //   }).componentInstance;
  //   this.modalInstance.claimNumber = claimNumber;
  // }

  private openModal(claimNumber: string) {
    let modalInstanceData = {
      DeleteClaimDialogComponent,
      claimNumber
    };

    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.CLAIMS,
      this.element,
      this.vcr,
      modalInstanceData
    )

    if(dialog) {
      dialog.pipe(take(1)).subscribe();
    }
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
