import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserRequestService } from '../../services';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FSUserRequest } from '../../../../occ-models';

@Component({
  selector: 'fsa-user-request-progress-bar',
  templateUrl: './user-request-progress-bar.component.html',
})
export class UserRequestProgressBarComponent implements OnInit, OnDestroy {
  userRequest$: Observable<FSUserRequest>;
  configurationSteps;
  private subscription = new Subscription();

  constructor(protected userRequestService: UserRequestService) {}

  ngOnInit() {
    this.userRequest$ = this.userRequestService.getUserRequest();
    this.subscription.add(
      this.userRequest$
        .pipe(
          map(userRequestData => {
            if (
              userRequestData.configurationSteps != null &&
              userRequestData.configurationSteps.length > 0
            ) {
              this.configurationSteps = userRequestData.configurationSteps;
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
