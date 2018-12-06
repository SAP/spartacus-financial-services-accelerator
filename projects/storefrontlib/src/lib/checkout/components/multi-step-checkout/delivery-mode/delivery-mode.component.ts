import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, takeWhile } from 'rxjs/operators';

import { CheckoutService } from '../../../facade/checkout.service';

@Component({
  selector: 'cx-delivery-mode',
  templateUrl: './delivery-mode.component.html',
  styleUrls: ['./delivery-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryModeComponent implements OnInit {
  @Input()
  selectedShippingMethod: string;

  @Output()
  selectMode = new EventEmitter<any>();
  @Output()
  backStep = new EventEmitter<any>();

  supportedDeliveryModes$: Observable<any>;
  leave = false;

  mode: FormGroup = this.fb.group({
    deliveryModeId: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private service: CheckoutService) {}

  ngOnInit() {
    this.supportedDeliveryModes$ = this.service.supportedDeliveryModes$.pipe(
      takeWhile(() => !this.leave),
      tap(supportedModes => {
        if (Object.keys(supportedModes).length === 0) {
          this.service.loadSupportedDeliveryModes();
        } else {
          if (this.selectedShippingMethod) {
            this.mode.controls['deliveryModeId'].setValue(
              this.selectedShippingMethod
            );
          }
        }
      })
    );
  }

  next() {
    this.selectMode.emit(this.mode.value);
  }

  back() {
    this.leave = true;
    this.backStep.emit();
  }

  get deliveryModeInvalid() {
    return this.mode.controls['deliveryModeId'].invalid;
  }
}
