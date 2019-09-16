import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ClaimService } from 'projects/fsastorefrontlib/src/lib/my-account/assets/services';
import * as fromClaimStore from '../../../../my-account/assets/store';

@Component({
  selector: 'fsa-step-group-progress',
  templateUrl: './fs-step-group-progress.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FSStepGroupProgressComponent implements OnInit {
  constructor(
    protected activatedRoute: ActivatedRoute,
    protected store: Store<fromClaimStore.UserState>,
    protected claimService: ClaimService
  ) {}

  request$;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const requestId = 'requestId';

      if (params[requestId]) {
        this.claimService.loadRequest(params[requestId]);
        this.request$ = this.store.pipe(
          select(fromClaimStore.getUserRequestData)
        );
      }
    });
  }
}
