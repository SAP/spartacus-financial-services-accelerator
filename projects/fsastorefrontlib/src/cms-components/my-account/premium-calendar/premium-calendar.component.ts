import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { PolicyService } from '../../../core/my-account/facade';
import { Subscription } from 'rxjs';
import { PolicyConnector } from '../../../core/my-account/connectors/policy.connector';
import { UserIdService } from '@spartacus/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-fs-premium-calendar',
  templateUrl: './premium-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PremiumCalendarComponent implements OnDestroy {
  constructor(
    protected policyService: PolicyService,
    protected userIdService: UserIdService,
    protected policyConnector: PolicyConnector
  ) {}

  policies$ = this.userIdService
    .getUserId()
    .pipe(switchMap(userId => this.policyConnector.getPremiumCalendar(userId)));

  selectedIndexes: number[] = [];
  private subscription = new Subscription();

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
