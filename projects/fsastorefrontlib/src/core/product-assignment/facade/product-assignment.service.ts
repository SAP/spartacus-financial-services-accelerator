import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService, OCC_USER_ID_ANONYMOUS } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { filter, switchMap, take } from 'rxjs/operators';
import * as fromAction from '../store/actions';
import { StateWithProductAssignment } from '../store/product-assignments-state';
import * as fromSelector from '../store/selectors';
@Injectable({
  providedIn: 'root',
})
export class ProductAssignmentService {
  constructor(
    protected store: Store<StateWithProductAssignment>,
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

  loadPotentialProductAssignments(orgUnitId: string) {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        if (occUserId && occUserId !== OCC_USER_ID_ANONYMOUS) {
          this.user = occUserId;
          this.store.dispatch(
            new fromAction.LoadPotentialProductAssignments({
              occUserId,
              orgUnitId,
            })
          );
        }
      })
      .unsubscribe();
  }

  createProductAssignment(orgUnitId: string, productCode: string) {
    const userId = this.user;
    this.store.dispatch(
      new fromAction.CreateProductAssignment({
        userId,
        orgUnitId,
        productCode,
      })
    );
  }

  removeProductAssignment(
    orgUnitId: string,
    productAssignmentCode: string,
    parentOrgUnit: string
  ) {
    const userId = this.user;
    this.store.dispatch(
      new fromAction.RemoveProductAssignment({
        userId,
        orgUnitId,
        productAssignmentCode,
        parentOrgUnit,
      })
    );
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

  getPotentialProductAssignments(): Observable<any> {
    return this.store.select(fromSelector.getLoaded).pipe(
      filter(loaded => loaded),
      take(1),
      switchMap(() => {
        return this.store.select(fromSelector.getPotentialProductAssignments);
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
