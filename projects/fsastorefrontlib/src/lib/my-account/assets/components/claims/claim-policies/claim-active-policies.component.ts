import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'fsa-claim-active-policies',
  templateUrl: './claim-active-policies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimActivePoliciesComponent implements OnInit {
  constructor(
    
  ) {}

    ngOnInit(){
        console.log('Load active policies');
    }
}
