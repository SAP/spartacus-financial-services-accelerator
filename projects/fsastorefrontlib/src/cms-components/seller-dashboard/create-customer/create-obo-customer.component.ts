import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title, UserIdService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
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

  @Output() actionChange = new EventEmitter<string>();
  form: FormGroup = this.service.form;
  titles$: Observable<Title[]> = this.service.titles$;
  subscription = new Subscription();
  dateFormat: string = this.config.date.format || '';

  onSubmit(): void {
    this.subscription.add(
      this.userIdService
        .takeUserId(true)
        .pipe(
          take(1),
          switchMap(consentHolder =>
            this.service.createCustomerByConsentHolder(consentHolder)
          )
        )
        .subscribe({
          next: () => {
            this.service.onSuccess();
            this.actionChange.emit('Added');
          },
          error: (error: Error) => this.service.onError(error),
        })
    );
  }
  back() {
    this.form.reset();
    this.actionChange.emit('Back');
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
