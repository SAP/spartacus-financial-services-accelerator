import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService, OCC_USER_ID_ANONYMOUS } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { filter, switchMap, take } from 'rxjs/operators';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import * as fromSelector from '../store/selectors';
@Injectable({
  providedIn: 'root',
})
export class FSProductAssignmentService {
  constructor(
    protected store: Store<fromReducer.ProductAssignmentState>,
    protected authService: AuthService
  ) {}

  user: string;

  loadProductAssignmentsForUnit(
    orgUnitId: string,
    active?: boolean,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ) {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        if (occUserId && occUserId !== OCC_USER_ID_ANONYMOUS) {
          this.user = occUserId;
          this.store.dispatch(
            new fromAction.LoadProductAssignments({
              occUserId,
              orgUnitId,
              active,
              pageSize,
              currentPage,
              sort,
            })
          );
        }
      })
      .unsubscribe();
  }

  changeActiveStatus(
    orgUnitId: string,
    productAssignmentCode: string,
    active: boolean
  ) {
    const userId = this.user;
    this.store.dispatch(
      new fromAction.UpdateProductAssignment({
        userId,
        orgUnitId,
        productAssignmentCode,
        active,
      })
    );
  }

  getProductAssignments(): Observable<any> {
    return this.store.select(fromSelector.getLoaded).pipe(
      filter(loaded => loaded),
      take(1),
      switchMap(() => {
        return this.store.select(fromSelector.getProductAssignments);
      })
    );
  }
}
