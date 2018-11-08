import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PoliciesService } from '../../services/policies.service';
import { OccConfig } from '@spartacus/core';
import { AuthService } from '@spartacus/storefront';

// NOTE: this a work in progress component. The code here is not ready for production.

@Component({
  selector: 'fsa-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(
    private service: PoliciesService,
    private config: OccConfig,
    private auth: AuthService
  ) {}

  policies$: Observable<any>;
  noPoliciesText = 'You have no Policies!';

  private user_id: string;

  ngOnInit() {
    this.subscription = this.auth.userToken$.subscribe(userData => {
      if (userData && userData.userId) {
        this.user_id = userData.userId;
      }
    });

    this.policies$ = this.service.getPolicies(this.user_id);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public getBaseUrl() {
    return this.config.server.baseUrl || '';
  }
}
