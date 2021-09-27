import { OccFSUserAdapter } from '../../../occ/adapters/user/occ-user.adapter';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { OccUserProfileAdapter } from '@spartacus/user/profile/occ';
import { UserProfileConnector } from '@spartacus/user/profile/core';

@Injectable({
  providedIn: 'root',
})
export class FSUserConnector extends UserProfileConnector {
  constructor(
    protected userAdapter: OccUserProfileAdapter,
    protected adapter: OccFSUserAdapter
  ) {
    super(userAdapter);
  }

  remove(userId: string): Observable<unknown> {
    return this.adapter.close(userId);
  }
}
