import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title, UserIdService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DateConfig } from './../../../core/date-config/date-config';
import { CreateOBOCustomerComponentService } from './create-obo-customer-component.service';

@Component({
  selector: 'cx-fs-create-obo-customer',
  templateUrl: './create-obo-customer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-form' },
})
export class CreateOBOCustomerComponent implements OnDestroy {
  constructor(
    protected config: DateConfig,
    protected service: CreateOBOCustomerComponentService,
    protected userIdService: UserIdService
  ) {}

  form: FormGroup = this.service.form;
  titles$: Observable<Title[]> = this.service.titles$;
  subscription = new Subscription();

  onSubmit(): void {
    this.subscription.add(
      this.userIdService
        .takeUserId(true)
        .pipe(
          take(1),
          map(consentHolder =>
            this.service.createCustomerByConsentHolder(consentHolder)
          )
        )
        .subscribe()
    );
  }

  getDateFormat() {
    return this.config.date.format || '';
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
