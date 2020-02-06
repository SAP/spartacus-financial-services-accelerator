import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { DefaultFormValidators } from '@fsa/dynamicforms';
import { AgentSearchService } from '../../../core/agent/services/agent-search.service';
import { UserRequestService } from '../../../core/user-request/services';

@Component({
  selector: 'fsa-contact-agent-form',
  templateUrl: './contact-agent-form.component.html',
})
export class ContactAgentFormComponent implements OnInit, OnDestroy {
  constructor(
    protected agentSearchService: AgentSearchService,
    protected userService: UserRequestService,
    private route: ActivatedRoute,
    protected fb: FormBuilder,
  ) { }

  private subscription = new Subscription();

  agent$: Observable<any>;

  contactAgentForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        DefaultFormValidators.regexValidator(DefaultFormValidators.emailRegex),
      ],
    ],
    phoneNumber: ['', [Validators.required]],
    interest: ['', [Validators.required]],
    contactType: ['', [Validators.required]],
    message: ['', [Validators.required]],
  });

  ngOnInit() {
    this.subscription
      .add(this.route.params.subscribe(params => this.initialize(params)))
      .add(
        this.userService.getUserDetails()
          .subscribe(user => {
            if (user && user.account) {
              this.contactAgentForm.patchValue({
                firstName: user.account.details.firstName,
                lastName: user.account.details.lastName,
                email: user.account.details.uid,
              });
            }
          })
      );
  }

  private initialize(params: Params) {
    if (params) {
      this.agent$ = this.agentSearchService.getAgentByID(params.agent);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
