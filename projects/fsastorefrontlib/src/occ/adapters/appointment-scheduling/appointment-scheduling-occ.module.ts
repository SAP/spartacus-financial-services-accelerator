import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { AppointmentSchedulingAdapter } from '../../../core/appointment-scheduling/connectors/appointment-scheduling.adapter';
import { defaultAppointmentSchedulingConfig } from './default-occ-appointment-scheduling-config';
import { OccAppointmentSchedulingAdapter } from './occ-appointment-scheduling.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: AppointmentSchedulingAdapter,
      useClass: OccAppointmentSchedulingAdapter,
    },
    provideConfig(defaultAppointmentSchedulingConfig),
  ],
})
export class AppointmentSchedulingOccModule {}
