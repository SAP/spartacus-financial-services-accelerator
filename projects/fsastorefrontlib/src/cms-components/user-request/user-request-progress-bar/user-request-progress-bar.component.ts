import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromUserRequestStore from '../../../lib/my-account/assets/store';

@Component({
  selector: 'fsa-user-request-progress-bar',
  templateUrl: './user-request-progress-bar.component.html',
})
export class UserRequestProgressBarComponent implements OnInit {
  constructor(protected store: Store<fromUserRequestStore.UserState>) {}

  request$;

  ngOnInit() {
    this.request$ = this.store.pipe(
      select(fromUserRequestStore.getUserRequestData)
    );
  }
}
