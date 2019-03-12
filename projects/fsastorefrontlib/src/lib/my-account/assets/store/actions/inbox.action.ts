import { Action } from '@ngrx/store';

export const LOAD_MESSAGES = '[Message] Load Messages';
export const SET_MESSAGES_STATE = '[Message] Change Messages';
export const LOAD_MESSAGES_SUCCESS = '[Message] Load Messages Success';
export const LOAD_MESSAGES_FAIL = '[Message] Load Messages Fail';

export class LoadMessages implements Action {
  readonly type = LOAD_MESSAGES;
  constructor(public payload: any) {}
}

export class LoadMessagesSuccess implements Action {
  readonly type = LOAD_MESSAGES_SUCCESS;
  constructor(public payload: any) {}
}

export class SetMessagesState implements Action {
  readonly type = SET_MESSAGES_STATE;
  constructor(public payload: any) {}
}

export class LoadMessagesFail implements Action {
  readonly type = LOAD_MESSAGES_FAIL;
  constructor(public payload: any) {}
}

export type MessageAction =
  | LoadMessages
  | LoadMessagesSuccess
  | LoadMessagesFail;
