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
  } from '@spartacus/core';
  import { Observable, Subscription } from 'rxjs';
  import { AgentSearchService } from '../../../core/agent/facade/agent-search.service';
  import { UserAccountFacade } from '@spartacus/user/account/root';
  import { DateConfig } from './../../../core/date-config/date-config';
  import { AppointmentSchedulingService } from './../../../core/appointment-scheduling/facade/appointment-scheduling.service';

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
  
    agent$: Observable<any>;
    agentId: string;
    userId: string;
  
    form: FormGroup = this.fb.group({
      subject: ['', [Validators.required]],
      appointmentDate: ['', [Validators.required]],
      appointmentTime: ['', [Validators.required]],
      description: ['', [Validators.required]],
      consentGiven: ['', [Validators.required]],
    });
  
    ngOnInit() {
      this.subscription
        .add(this.route.params.subscribe(params => this.initialize(params)))
        .add(
          this.userAccountFacade.get().subscribe(user => {
            if (user && user.uid) {
              this.userId = user.uid;
            } else {
              this.userId = OCC_USER_ID_ANONYMOUS;
            }
          })
        );
    }
  
    private initialize(params: Params) {
      if (params) {
        this.agentId = params.agent;
        this.agent$ = this.agentSearchService.getAgentByID(params.agent);
      }
    }
  
    collectDataFromContactAgentForm(formData: any) {
      const { subject, appointmentDate, appointmentTime, description, consentApproval } = formData;
      return {
        subject,
        appointmentDate,
        appointmentTime,
        description,
        consentApproval,
      };
    }
    getDateFormat() {
      return this.config.date.format || '';
    }
  
    submit(): void {
      this.subscription.add(
        this.appointmentSchedulingService
          .createAppointment(
            this.agentId,
            this.userId,
            {}
            // this.collectDataFromContactAgentForm(this.form.value)
          )
          .subscribe(data => {
            if (data) {
              this.router.go('/');
              this.globalMessageService.add(
                'Appointment has been created',
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
  