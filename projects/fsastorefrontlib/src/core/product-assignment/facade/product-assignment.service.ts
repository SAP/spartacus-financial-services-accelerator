import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { B2BUser, OCC_USER_ID_ANONYMOUS, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map, switchMap, take } from 'rxjs/operators';
import * as fromAction from '../store/actions';
import { StateWithProductAssignment } from '../store/product-assignments-state';
import * as fromSelector from '../store/selectors';
import { UserAccountFacade } from '@spartacus/user/account/root';
@Injectable({
  providedIn: 'root',
})
export class ProductAssignmentService {
  constructor(
    protected store: Store<StateWithProductAssignment>,
    protected userIdService: UserIdService,
    protected userAccountFacade: UserAccountFacade
  ) {}

  user: string;

  loadProductAssignmentsForUnit(
    orgUnitId: string,
    active?: boolean,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ) {
    this.userIdService
      .getUserId()
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
    this.userIdService
      .getUserId()
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

  isUserAdminOfUnit(unitId: string): Observable<boolean> {
    return this.userAccountFacade.get().pipe(
      filter(user => !!user && user?.uid !== OCC_USER_ID_ANONYMOUS),
      map(user => {
        return (<B2BUser>user).orgUnit?.uid === unitId;
      })
    );
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
