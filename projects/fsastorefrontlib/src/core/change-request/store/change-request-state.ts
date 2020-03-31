import { LoaderState } from '@spartacus/core';

export const CHANGE_REQUEST_FEATURE = 'changeRequests';

export const CHANGE_REQUEST_DATA = '[Change Request] Change Request Data';

export interface StateWithChangeRequest {
  [CHANGE_REQUEST_FEATURE]: ChangeRequestsState;
}

export interface ChangeRequestsState {
  changeRequest: LoaderState<ChangeRequestState>;
}

export interface ChangeRequestState {
  loaded: boolean;
  content: {};
}
