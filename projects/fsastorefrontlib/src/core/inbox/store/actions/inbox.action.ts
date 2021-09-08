import { Action } from '@ngrx/store';

export const LOAD_MESSAGES = '[Inbox] Load Messages';
export const LOAD_MESSAGES_SUCCESS = '[Inbox] Load Messages Success';
export const LOAD_MESSAGES_FAIL = '[Inbox] Load Messages Fail';

export const UPDATE_MESSAGES = '[Inbox] Update Messages';
export const UPDATE_MESSAGES_SUCCESS = '[Inbox] Update Messages Success';
export const UPDATE_MESSAGES_FAIL = '[Inbox] Update Messages Fail';

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

export class UpdateMessages implements Action {
  readonly type = UPDATE_MESSAGES;
  constructor(public payload: any) {}
}

export class UpdateMessagesSuccess implements Action {
  readonly type = UPDATE_MESSAGES_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateMessagesFail implements Action {
  readonly type = UPDATE_MESSAGES_FAIL;
  constructor(public payload: any) {}
}

export type InboxAction =
  | LoadMessages
  | LoadMessagesSuccess
  | LoadMessagesFail
  | UpdateMessages
  | UpdateMessagesSuccess;
