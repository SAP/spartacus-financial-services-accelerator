import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DefaultFormValidators } from '@spartacus/dynamicforms';
import {
  GlobalMessageService,
  GlobalMessageType,
  OCC_USER_ID_ANONYMOUS,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { AgentSearchService } from '../../../core/agent/facade/agent-search.service';
import { CsTicketService } from './../../../core/cs-ticket/facade/cs-ticket.service';
import { ContactAgentData } from './../../../occ/occ-models';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'cx-fs-contact-agent-form',
  templateUrl: './contact-agent-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactAgentFormComponent implements OnInit, OnDestroy {
  constructor(
    protected agentSearchService: AgentSearchService,
    protected userAccountFacade: UserAccountFacade,
    protected userIdService: UserIdService,
    protected route: ActivatedRoute,
    protected fb: UntypedFormBuilder,
    protected globalMessageService: GlobalMessageService,
    protected router: RoutingService,
    protected csTicketService: CsTicketService
  ) {}

  private subscription = new Subscription();

  agent$: Observable<any>;
  agentId: string;
  userId: string;

  contactAgentForm: UntypedFormGroup = this.fb.group({
    email: ['', [Validators.required, DefaultFormValidators.email]],
    interest: ['', [Validators.required]],
    contactType: ['', [Validators.required]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required]],
  });

  ngOnInit() {
    this.subscription
      .add(this.route.params.subscribe(params => this.initialize(params)))
      .add(
        this.userAccountFacade.get().subscribe(user => {
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
    this.userIdService
      .getUserId()
      .pipe(
        take(1),
        switchMap(userId =>
          this.csTicketService.createCsTicketForAgent(
            this.agentId,
            userId,
            this.collectDataFromContactAgentForm(this.contactAgentForm.value)
          )
        ),
        map(data => {
          if (data) {
            this.router.go('/');
            this.globalMessageService.add(
              { key: 'fscommon.ticketCreated' },
              GlobalMessageType.MSG_TYPE_CONFIRMATION
            );
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
