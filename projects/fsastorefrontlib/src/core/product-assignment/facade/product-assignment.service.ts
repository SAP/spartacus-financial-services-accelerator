import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { filter, switchMap, take } from 'rxjs/operators';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import * as fromSelector from '../store/selectors';
import { AuthService } from '@spartacus/core';
@Injectable({
  providedIn: 'root',
})
export class FSProductAssignmentService {
  constructor(
    protected store: Store<fromReducer.ProductAssignmentState>,
    protected authService: AuthService
  ) {}

  loadProductAssignmentsForUnit(
    userId: string,
    orgUnitId: string,
    active?: boolean,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ) {
    this.store.dispatch(
      new fromAction.LoadProductAssignments({
        userId,
        orgUnitId,
        active,
        pageSize,
        currentPage,
        sort,
      })
    );
  }

  changeActiveStatus(
    userId: string,
    orgUnitId: string,
    productAssignmentCode: string,
    active: boolean
  ) {
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
