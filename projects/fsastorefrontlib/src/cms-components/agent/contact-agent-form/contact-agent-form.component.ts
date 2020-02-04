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

@Component({
  selector: 'fsa-contact-agent-form',
  templateUrl: './contact-agent-form.component.html',
})
export class ContactAgentFormComponent implements OnInit, OnDestroy {
  constructor(
    protected agentSearchService: AgentSearchService,
    private route: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  subscription = new Subscription();
  agent$: Observable<any>;

  contactAgentForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, CustomFormValidators.emailValidator]],
    phoneNumber: ['', [Validators.required]],
    interest: ['', [Validators.required]],
    contactType: ['', [Validators.required]],
    message: ['', [Validators.required]],
  });

  ngOnInit() {
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
