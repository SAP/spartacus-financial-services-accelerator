import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AgentSearchService } from '../../../core/agent/services/agent-search.service';
import { CustomFormValidators } from '@spartacus/storefront';
import {
  UserState,
  UserDetailsState,
  StateWithUser,
  UsersSelectors,
} from '@spartacus/core';
import { Store, select } from '@ngrx/store';

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
  ) {}

  subscription = new Subscription();
  agent$: Observable<any>;
  contactAgentForm: FormGroup;
  prefilledFirstName;
  prefilledLastName;
  prefilledEmail;

  ngOnInit() {
    this.subscription.add(
      this.userStore
        .pipe(select(UsersSelectors.getUserState))
        .subscribe(user => {
          this.prefilledFirstName = user.account.details.firstName;
          this.prefilledLastName = user.account.details.lastName;
          this.prefilledEmail = user.account.details.uid;
        })
    );
    this.contactAgentForm = this.fb.group({
      firstName: [this.prefilledFirstName, Validators.required],
      lastName: [this.prefilledLastName, Validators.required],
      email: [this.prefilledEmail, [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      interest: ['', [Validators.required]],
      contactType: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
    this.subscription.add(
      this.route.params.subscribe(params => this.initialize(params))
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
