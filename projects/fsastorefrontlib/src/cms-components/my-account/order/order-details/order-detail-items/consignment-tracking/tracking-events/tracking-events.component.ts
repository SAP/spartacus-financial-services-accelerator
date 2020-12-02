import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsignmentTracking, UserOrderService } from '@spartacus/core';
import { TrackingEventsComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-fs-tracking-events',
  templateUrl: './tracking-events.component.html',
})
export class FSTrackingEventsComponent extends TrackingEventsComponent {
  tracking$: Observable<ConsignmentTracking>;
  shipDate: Date;
  consignmentCode: string;

  constructor(
    public activeModal: NgbActiveModal,
    protected FSuserOrderService: UserOrderService
  ) {
    super(activeModal, FSuserOrderService);
  }
}
