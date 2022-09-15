import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OccConfig, UserIdService } from '@spartacus/core';
import { PolicyService } from '../../../core/my-account/facade';
import { PolicyConnector } from '../../../core/my-account/connectors/policy.connector';

@Component({
  selector: 'cx-fs-premium-calendar',
  templateUrl: './premium-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PremiumCalendarComponent implements OnInit, OnDestroy {
  /**
   * @deprecated since version 4.0.2
   * Use constructor(policyService: PolicyService, userIdService: UserIdService, policyConnector: PolicyConnector); instead
   */
  // TODO(CXFSA-550): Remove deprecated constructor
  constructor(config: OccConfig, policyService: PolicyService);

  constructor(
    protected config: OccConfig, // TODO(CXFSA-550): Remove it since it's not being used anymore
    protected policyService: PolicyService,
    protected userIdService?: UserIdService, // TODO(CXFSA-550): Make it required
    protected policyConnector?: PolicyConnector // TODO(CXFSA-550): Make it required
  ) {}

  /**
   * @deprecated since version 4.0.2
   * Use premiumCalendar
   */
  policies$;
  /**
   * @deprecated since version 4.0.2
   * Not used anywhere in component anymore
   */
  policiesLoaded$;
  /**
   * @deprecated since version 4.0.2
   * Not used anywhere in component anymore
   */
  baseUrl: string;

  selectedIndexes: number[] = [];
  premiumCalendar$ = this.userIdService
    .getUserId()
    .pipe(switchMap(userId => this.policyConnector.getPremiumCalendar(userId)));
  private subscription = new Subscription();

  /**
   * @deprecated since version 4.0.2
   * ngOnInit and everything in it not needed anymore
   */
  ngOnInit() {
    this.policyService.loadPremiumCalendar();
    this.policies$ = this.policyService.getPremiumCalendar();
    this.policiesLoaded$ = this.policyService.getPremiumCalendarLoaded();
    this.baseUrl = this.config.backend.occ.baseUrl || '';
  }

  toggleActiveAccordion(index: number) {
    this.selectedIndexes.includes(index)
      ? this.selectedIndexes.splice(this.selectedIndexes.indexOf(index), 1)
      : this.selectedIndexes.push(index);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
