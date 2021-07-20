import { OccFSUserAdapter } from '../../../occ/adapters/user/occ-user.adapter';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { OccUserAdapter, UserConnector } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class FSUserConnector extends UserConnector {
  constructor(
    protected userAdapter: OccUserAdapter,
    protected adapter: OccFSUserAdapter
  ) {
    super(userAdapter);
  }

  remove(userId: string): Observable<unknown> {
    return this.adapter.remove(userId);
  }
}
