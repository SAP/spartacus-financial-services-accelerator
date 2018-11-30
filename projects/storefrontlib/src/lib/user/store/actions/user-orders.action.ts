import { Action } from '@ngrx/store';
import { Order, PaginationModel, SortModel } from '@spartacus/core';

export const LOAD_USER_ORDERS = '[User] Load User Orders';
export const LOAD_USER_ORDERS_FAIL = '[User] Load User Orders Fail';
export const LOAD_USER_ORDERS_SUCCESS = '[User] Load User Orders Success';

export class LoadUserOrders implements Action {
  readonly type = LOAD_USER_ORDERS;
  constructor(
    public payload: {
      userId: string;
      pageSize: number;
      currentPage?: number;
      sort?: string;
    }
  ) {}
}

export class LoadUserOrdersFail implements Action {
  readonly type = LOAD_USER_ORDERS_FAIL;
  constructor(public payload: any) {}
}

export class LoadUserOrdersSuccess implements Action {
  readonly type = LOAD_USER_ORDERS_SUCCESS;
  constructor(
    public payload: {
      orders: Order[];
      pagination: PaginationModel;
      sort: SortModel[];
    }
  ) {}
}

// exported type
export type UserOrdersAction =
  | LoadUserOrders
  | LoadUserOrdersFail
  | LoadUserOrdersSuccess;
