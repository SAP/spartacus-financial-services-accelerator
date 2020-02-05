import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {
  StateWithUser,
  UsersSelectors,
} from '@spartacus/core';
import { Store, select } from '@ngrx/store';
import { DefaultFormValidators } from '@fsa/dynamicforms';
import { AgentSearchService } from '../../../core/agent/services/agent-search.service';

@Component({
  selector: 'fsa-contact-agent-form',
  templateUrl: './contact-agent-form.component.html',
})
export class ContactAgentFormComponent implements OnInit, OnDestroy {
  constructor(
    protected agentSearchService: AgentSearchService,
    private route: ActivatedRoute,
    protected fb: FormBuilder,
    protected userStore: Store<StateWithUser>
  ) { }

  private subscription = new Subscription();

  agent$: Observable<any>;

  contactAgentForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, DefaultFormValidators.regexValidator(
      DefaultFormValidators.emailRegex
    )]],
    phoneNumber: ['', [Validators.required]],
    interest: ['', [Validators.required]],
    contactType: ['', [Validators.required]],
    message: ['', [Validators.required]],
  });

  ngOnInit() {
    this.subscription
      .add(
        this.route.params.subscribe(params => this.initialize(params))
      )
      .add(
        this.userStore.pipe(select(UsersSelectors.getUserState))
          .subscribe(user => {
            if (user && user.account) {
              this.contactAgentForm.patchValue({
                firstName: user.account.details.firstName,
                lastName: user.account.details.lastName,
                email: user.account.details.uid
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
