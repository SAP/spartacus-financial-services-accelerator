export const CHANGE_REQUEST_FEATURE = 'changeRequests';

export interface StateWithChangeRequest {
  [CHANGE_REQUEST_FEATURE]: ChangeRequestsState;
}

export interface ChangeRequestsState {
  changeRequest: ChangeRequestState;
}

export interface ChangeRequestState {
  loaded: boolean;
  content: {};
}
