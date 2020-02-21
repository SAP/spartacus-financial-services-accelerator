import { filter, take, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import * as fromSelector from '../store/selectors';
@Injectable({
  providedIn: 'root',
})
export class FSProductAssignmentService {
  constructor(protected store: Store<fromReducer.ProductAssignmentState>) {}

  loadProductAssignmentsForUnit(userId: string, orgUnitId: string) {
    this.store.dispatch(
      new fromAction.LoadProductAssignments({
        userId: userId,
        orgUnitId: orgUnitId,
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
