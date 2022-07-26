import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RoutingService, WindowRef } from '@spartacus/core';
import { genericIcons } from '../../../assets/icons/generic-icons';

@Component({
  selector: 'cx-fs-appointment-scheduling-confirmation',
  templateUrl: 'appointment-scheduling-confirmation.component.html',
})
export class AppointmentSchedulingConfirmationComponent implements OnInit {
  constructor(
    protected domSanitizer: DomSanitizer,
    protected routingService: RoutingService,
    protected winRef: WindowRef
  ) {}

  appointmentDate: string;
  imageLink = this.domSanitizer.bypassSecurityTrustUrl(
    genericIcons.appointmentConfirmationImage
  );

  ngOnInit() {
    this.appointmentDate = this.winRef.nativeWindow.history.state.date;

    if (!this.appointmentDate) {
      this.routingService.go('/');
    }
  }
}
