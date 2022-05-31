import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  OCC_USER_ID_ANONYMOUS,
  RoutingService,
  User,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { AgentSearchService } from '../../../core/agent/facade/agent-search.service';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { DateConfig } from './../../../core/date-config/date-config';
import { AppointmentSchedulingService } from './../../../core/appointment-scheduling/facade/appointment-scheduling.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-fs-appointment-scheduling-form',
  templateUrl: './appointment-scheduling-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentSchedulingFormComponent implements OnInit, OnDestroy {
  constructor(
    protected agentSearchService: AgentSearchService,
    protected userAccountFacade: UserAccountFacade,
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected globalMessageService: GlobalMessageService,
    protected router: RoutingService,
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
  date = new Date();

  form: FormGroup = this.fb.group({
    subject: ['', [Validators.required]],
    appointmentDate: [null, [Validators.required]],
    appointmentTime: ['', [Validators.required]],
    description: ['', [Validators.required]],
    consentGiven: [false, [Validators.required, Validators.requiredTrue]],
  });

  ngOnInit() {
    this.subscription
      .add(this.getAgentId().subscribe())
      .add(this.getUserId().subscribe())
      .add(this.onConsentChange().subscribe());
  }

  goBack() {
    this.router.back();
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
          tap(() => {
            this.router.go('/');
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

  private getUserId(): Observable<User> {
    return this.userAccountFacade.get().pipe(
      tap(user => {
        this.userId = user && user.uid ? user.uid : OCC_USER_ID_ANONYMOUS;
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
