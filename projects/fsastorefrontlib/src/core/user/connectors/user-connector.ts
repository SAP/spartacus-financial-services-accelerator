import { OccFSUserAdapter } from '../../../occ/adapters/user/occ-user.adapter';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserProfileConnector } from '@spartacus/user/profile/core/connectors/user-profile.connector';
import { UserProfileAdapter } from '@spartacus/user/profile/core/connectors/user-profile.adapter';

@Injectable({
  providedIn: 'root',
})
export class FSUserConnector extends UserProfileConnector {
  constructor(
    protected userAdapter: UserProfileAdapter,
    protected adapter: OccFSUserAdapter
  ) {
    super(userAdapter);
  }

  remove(userId: string): Observable<unknown> {
    return this.adapter.remove(userId);
  }
}
