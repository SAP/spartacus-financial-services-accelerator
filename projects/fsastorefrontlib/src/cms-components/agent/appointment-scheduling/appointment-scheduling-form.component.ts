import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  OCC_USER_ID_ANONYMOUS,
  UserIdService,
  RoutingService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { DateConfig } from './../../../core/date-config/date-config';
import { AppointmentSchedulingService } from './../../../core/appointment-scheduling/facade/appointment-scheduling.service';
import { switchMap, tap } from 'rxjs/operators';
import { DefaultFormValidators } from '@spartacus/dynamicforms';

@Component({
  selector: 'cx-fs-appointment-scheduling-form',
  templateUrl: './appointment-scheduling-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentSchedulingFormComponent implements OnInit, OnDestroy {
  constructor(
    protected userIdService: UserIdService,
    protected route: ActivatedRoute,
    protected fb: UntypedFormBuilder,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected appointmentSchedulingService: AppointmentSchedulingService,
    protected config: DateConfig
  ) {}

  private subscription = new Subscription();

  agentId: string;
  userId: string;
  availableTimes = Array(6)
    .fill(null)
    .map((_elem, index) => ({
      label: `${index + 10}:00 (1h)`,
      value: `${index + 10}:00`,
    }));
  today = new Date();
  tomorrow = this.today.setDate(this.today.getDate() + 1);
  subjectMaxLength: number = 50;
  descriptionMaxLength: number = 250;

  form: UntypedFormGroup = this.fb.group({
    subject: [
      '',
      [Validators.required, Validators.maxLength(this.subjectMaxLength)],
    ],
    appointmentDate: [
      null,
      [
        Validators.required,
        DefaultFormValidators.compareToCurrentDate('shouldBeGreater'),
      ],
    ],
    appointmentTime: ['', [Validators.required]],
    description: [
      '',
      [Validators.required, Validators.maxLength(this.descriptionMaxLength)],
    ],
    consentGiven: [false, [Validators.required, Validators.requiredTrue]],
  });

  ngOnInit() {
    this.subscription.add(
      this.getAgentId()
        .pipe(
          switchMap(_ => this.getUserId()),
          switchMap(_ => this.onConsentChange())
        )
        .subscribe()
    );
  }

  goBack() {
    this.routingService.back();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.subscription.add(
      this.appointmentSchedulingService
        .createAppointment(this.agentId, this.userId, this.form.value)
        .pipe(
          tap(createdAppointment => {
            this.routingService.go(
              {
                cxRoute: 'appointmentSchedulingConfirmationPage',
              },
              {
                state: createdAppointment,
              }
            );

            this.globalMessageService.add(
              { key: 'appointmentScheduling.createdAppointment' },
              GlobalMessageType.MSG_TYPE_CONFIRMATION
            );
          })
        )
        .subscribe()
    );
  }

  private getAgentId(): Observable<Params> {
    return this.route.params.pipe(
      tap((params: Params) => {
        if (params) {
          this.agentId = params.agent;
        }
      })
    );
  }

  private getUserId(): Observable<string> {
    return this.userIdService.getUserId().pipe(
      tap(userId => {
        this.userId = userId ? userId : OCC_USER_ID_ANONYMOUS;
      })
    );
  }

  private onConsentChange(): Observable<any> {
    return this.form.get('consentGiven').valueChanges.pipe(
      tap(val => {
        if (val) {
          this.globalMessageService.add(
            { key: 'appointmentScheduling.successfulConsent' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        }
      })
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
