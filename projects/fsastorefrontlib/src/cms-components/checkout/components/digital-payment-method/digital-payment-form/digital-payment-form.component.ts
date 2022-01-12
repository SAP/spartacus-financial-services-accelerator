import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  StatePersistenceService,
  WindowRef,
} from '@spartacus/core';
import {
  DpCheckoutPaymentService,
  DpPaymentRequest,
} from '@spartacus/digital-payments';
import { of, Subscription } from 'rxjs';

const KEY = 'digital-payment.checkout.request';

@Component({
  selector: 'cx-fs-digital-payment-form',
  templateUrl: './digital-payment-form.component.html',
})
export class FSDigitalPaymentFormComponent implements OnInit {
  @Output()
  closeForm = new EventEmitter<any>();
  subscription = new Subscription();

  constructor(
    protected dpPaymentService: DpCheckoutPaymentService,
    protected statePersistenceService: StatePersistenceService,
    protected globalMsgService: GlobalMessageService,
    protected winRef: WindowRef
  ) {}

  ngOnInit(): void {
    this.dpPaymentService.getCardRegistrationDetails().subscribe(request => {
      if (request?.url) {
        this.syncCardRegistrationState(request);
        this.redirect(request.url);
      } else if (request) {
        this.globalMsgService.add(
          { key: 'dpPaymentForm.error.redirect' },
          GlobalMessageType.MSG_TYPE_ERROR
        );
        this.closeForm.emit();
      }
    });
  }

  syncCardRegistrationState(request: DpPaymentRequest): void {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage<
        DpPaymentRequest | undefined
      >({
        key: KEY,
        state$: of(request),
      })
    );
  }

  redirect(url: string) {
    const window = this.winRef.nativeWindow;

    if (window?.location) {
      window.location.href = url;
    }
  }
}
