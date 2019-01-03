import { Action } from '@ngrx/store';

export const LOAD_PREMIUM_CALENDAR = '[Quote] Load PremiumCalendar';
export const LOAD_PREMIUM_CALENDAR_SUCCESS = '[Quote] Load PremiumCalendar Success';
export const LOAD_PREMIUM_CALENDAR_FAIL = '[Quote] Load PremiumCalendar Fail';

export class LoadPremiumCalendar implements Action {
  readonly type = LOAD_PREMIUM_CALENDAR;
  constructor(public payload: any) {}
}

export class LoadPremiumCalendarSuccess implements Action {
  readonly type = LOAD_PREMIUM_CALENDAR_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadPremiumCalendarFail implements Action {
  readonly type = LOAD_PREMIUM_CALENDAR_FAIL;
  constructor(public payload: any) {}
}

export type PremiumCalendarAction =
  | LoadPremiumCalendar
  | LoadPremiumCalendarSuccess
  | LoadPremiumCalendarFail;
