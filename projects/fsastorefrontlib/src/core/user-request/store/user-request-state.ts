import { FSUserRequest } from '../../../occ/occ-models';

export const USER_REQUEST_FEATURE = 'userRequest';

export interface StateWithUserRequest {
  [USER_REQUEST_FEATURE]: UserRequestState;
}

export interface FSUserRequestState {
  userRequest: UserRequestState;
}

export interface UserRequestState {
  content: FSUserRequest;
  loaded: boolean;
}
