import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '@spartacus/core';
import { DefaultFormValidators } from '@fsa/dynamicforms';
import { AgentSearchService } from '../../../core/agent/services/agent-search.service';

@Component({
  selector: 'fsa-contact-agent-form',
  templateUrl: './contact-agent-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactAgentFormComponent implements OnInit, OnDestroy {
  constructor(
    protected agentSearchService: AgentSearchService,
    protected userService: UserService,
    protected route: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

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
        this.userService.get().subscribe(user => {
          if (user) {
            this.contactAgentForm.patchValue({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.uid,
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
