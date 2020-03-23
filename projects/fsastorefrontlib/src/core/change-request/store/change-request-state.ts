export const CHANGE_REQUEST_FEATURE = 'changeRequests';

export interface StateWithChangeRequest {
  [CHANGE_REQUEST_FEATURE]: ChangeRequestState;
}

export interface ChangeRequestsState {
  changeRequest: ChangeRequestState;
}

export interface ChangeRequestState {
  loaded: boolean;
  content: {};
}
