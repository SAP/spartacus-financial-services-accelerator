import { Action } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { INBOX_DATA } from '../inbox-state';

export const LOAD_MESSAGES = '[Inbox] Load Messages';
export const LOAD_MESSAGES_SUCCESS = '[Inbox] Load Messages Success';
export const LOAD_MESSAGES_FAIL = '[Inbox] Load Messages Fail';

export const UPDATE_MESSAGES = '[Inbox] Update Messages';
export const UPDATE_MESSAGES_SUCCESS = '[Inbox] Update Messages Success';
export const UPDATE_MESSAGES_FAIL = '[Inbox] Update Messages Fail';

export class LoadMessages extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_MESSAGES;
  constructor(public payload: any) {
    super(INBOX_DATA);
  }
}

export class LoadMessagesSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_MESSAGES_SUCCESS;
  constructor(public payload: any) {
    super(INBOX_DATA);
  }
}

export class LoadMessagesFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_MESSAGES_FAIL;
  constructor(public payload: any) {
    super(INBOX_DATA, payload);
  }
}

export class UpdateMessages extends StateUtils.LoaderLoadAction {
  readonly type = UPDATE_MESSAGES;
  constructor(public payload: any) {
    super(INBOX_DATA);
  }
}

export class UpdateMessagesSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = UPDATE_MESSAGES_SUCCESS;
  constructor(public payload: any) {
    super(INBOX_DATA);
  }
}

export class UpdateMessagesFail extends StateUtils.LoaderFailAction {
  readonly type = UPDATE_MESSAGES_FAIL;
  constructor(public payload: any) {
    super(INBOX_DATA, payload);
  }
}

export type InboxAction =
  | LoadMessages
  | LoadMessagesSuccess
  | LoadMessagesFail
  | UpdateMessages
  | UpdateMessagesSuccess;
