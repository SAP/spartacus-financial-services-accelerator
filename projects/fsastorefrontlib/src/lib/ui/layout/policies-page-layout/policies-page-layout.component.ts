import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../../my-account/assets/services/policy.service';

@Component({
  selector: 'fsa-policies-page-layout',
  templateUrl: './policies-page-layout.component.html',
  styleUrls: ['./policies-page-layout.component.scss']
})
export class PoliciesPageLayoutComponent implements OnInit {
  constructor(
    protected policyService: PolicyService
  ) {}

  policies = 'Policies';

  ngOnInit() {
    this.policyService.loadPolicies();
  }
}
