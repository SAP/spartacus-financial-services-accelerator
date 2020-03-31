import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DefaultFormValidators } from '@fsa/dynamicforms';
import {
  GlobalMessageService,
  GlobalMessageType,
  OCC_USER_ID_ANONYMOUS,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { AgentSearchService } from '../../../core/agent/facade/agent-search.service';
import { CsTicketService } from './../../../core/cs-ticket/facade/cs-ticket.service';
import { ContactAgentData } from './../../../occ/occ-models';

@Component({
  selector: 'cx-fs-contact-agent-form',
  templateUrl: './contact-agent-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactAgentFormComponent implements OnInit, OnDestroy {
  constructor(
    protected agentSearchService: AgentSearchService,
    protected userService: UserService,
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected globalMessageService: GlobalMessageService,
    protected router: RoutingService,
    protected csTicketService: CsTicketService
  ) {}

  private subscription = new Subscription();

  agent$: Observable<any>;
  agentId: string;
  userId: string;

  contactAgentForm: FormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        DefaultFormValidators.regexValidator(DefaultFormValidators.emailRegex),
      ],
    ],
    interest: ['', [Validators.required]],
    contactType: ['', [Validators.required]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required]],
  });

  ngOnInit() {
    this.subscription
      .add(this.route.params.subscribe(params => this.initialize(params)))
      .add(
        this.userService.get().subscribe(user => {
          if (user && user.uid) {
            this.userId = user.uid;
            this.contactAgentForm.patchValue({
              email: user.uid,
            });
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

  collectDataFromContactAgentForm(formData: any): ContactAgentData {
    const { email, interest, contactType, subject, message } = formData;
    return {
      email,
      interest,
      contactType,
      subject,
      message,
    };
  }

  submit(): void {
    this.subscription.add(
      this.csTicketService
        .createCsTicketForAgent(
          this.agentId,
          this.userId,
          this.collectDataFromContactAgentForm(this.contactAgentForm.value)
        )
        .subscribe(data => {
          if (data) {
            this.router.go('/');
            this.globalMessageService.add(
              'Ticket has been created',
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
