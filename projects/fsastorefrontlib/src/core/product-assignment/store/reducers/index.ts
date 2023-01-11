import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { AuthActions } from '@spartacus/core';
import { ProductAssignmentsState } from '../product-assignments-state';
import * as fromReducer from './product-assignment.reducer';

export function getReducers(): ActionReducerMap<ProductAssignmentsState> {
  return {
    productAssignments: fromReducer.reducer,
  };
}
export const reducerToken: InjectionToken<
  ActionReducerMap<ProductAssignmentsState>
> = new InjectionToken<ActionReducerMap<ProductAssignmentsState>>(
  'ProductAssignmentsReducers'
);
export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
export function clearProductAssignmentState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function (state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<any>[] = [clearProductAssignmentState];
