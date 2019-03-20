import { Action } from '@ngrx/store';

export const LOAD_MESSAGES = '[Message] Load Messages';
export const LOAD_MESSAGES_SUCCESS = '[Message] Load Messages Success';
export const LOAD_MESSAGES_FAIL = '[Message] Load Messages Fail';

export const LOAD_MESSAGE = '[Message] Load Message';
export const LOAD_MESSAGE_SUCCESS = '[Message] Load Message Success';
export const LOAD_MESSAGE_FAIL = '[Message] Load Message Fail';

export const SET_MESSAGES_STATE = '[Message] Set Messages';
export const SET_MESSAGES_STATE_SUCCESS = '[Message] Set Messages Success';
export const SET_MESSAGES_STATE_ERROR = '[Message] Set Messages Error';

export class LoadMessages implements Action {
  readonly type = LOAD_MESSAGES;
  constructor(public payload: any) {}
}

export class LoadMessagesSuccess implements Action {
  readonly type = LOAD_MESSAGES_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadMessagesFail implements Action {
  readonly type = LOAD_MESSAGES_FAIL;
  constructor(public payload: any) {}
}

export class SetMessagesState implements Action {
  readonly type = SET_MESSAGES_STATE;
  constructor(public payload: any) {}
}

export class SetMessagesStateSuccess implements Action {
  readonly type = SET_MESSAGES_STATE_SUCCESS;
  constructor(public payload: any) {}
}

export class SetMessagesStateError implements Action {
  readonly type = SET_MESSAGES_STATE_ERROR;
  constructor(public payload: any) {}
}

export type MessageAction =
  | LoadMessages
  | LoadMessagesSuccess
  | LoadMessagesFail
  | SetMessagesState
  | SetMessagesStateSuccess
  | SetMessagesStateError;
