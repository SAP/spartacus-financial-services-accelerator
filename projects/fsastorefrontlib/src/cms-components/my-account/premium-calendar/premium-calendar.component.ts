import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { PolicyService } from '../../../core/my-account/facade';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-fs-premium-calendar',
  templateUrl: './premium-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PremiumCalendarComponent implements OnDestroy {
  constructor(protected policyService: PolicyService) {}

  policies$ = this.policyService.getPremiumCalendar();
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
