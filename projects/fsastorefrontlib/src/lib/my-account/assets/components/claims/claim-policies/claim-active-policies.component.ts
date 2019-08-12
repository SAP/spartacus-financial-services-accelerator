import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OccPolicyService } from 'projects/fsastorefrontlib/src/lib/occ/policy/policy.service';
import { AuthService } from '@spartacus/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'fsa-claim-active-policies',
  templateUrl: './claim-active-policies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimActivePoliciesComponent implements OnInit {
  constructor(
    private occPolicyService: OccPolicyService,
    private auth: AuthService,
  ) {}

  policies$: Observable<any>;

    ngOnInit(){
        //THIS LOGIC SHOULD BE REPLCATED WIHT STORE LOGIC
        this.auth.getUserToken().subscribe(userData => {
            console.log(userData.userId);
            this.policies$ = this.occPolicyService.getPoliciesByCategory(userData.userId, 'insurances_auto');
          });
    }
}
