import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RoutingService } from '@spartacus/core';
import { genericIcons } from '../../../assets/icons/generic-icons';

@Component({
  selector: 'cx-fs-appointment-scheduling-confirmation',
  templateUrl: 'appointment-scheduling-confirmation.component.html',
})
export class AppointmentSchedulingConfirmationComponent implements OnInit {
  constructor(
    protected domSanitizer: DomSanitizer,
    protected routingService: RoutingService
  ) {}

  appointmentDate: string;

  ngOnInit() {
    if (history.state.date) {
      this.appointmentDate = history.state.date;
    } else {
      this.routingService.go('/');
    }
  }

  getImagelink() {
    return this.domSanitizer.bypassSecurityTrustUrl(genericIcons.document);
  }
}
