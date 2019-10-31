import { FSUserRequest } from '../../../occ-models';

export const USER_REQUEST_FEATURE = 'userRequest';
export const USER_REQUEST_DATA = '[User Request] User Request Data';

export interface StateWithUserRequest {
  [USER_REQUEST_FEATURE]: UserRequestState;
}

export interface UserRequestState {
  content: FSUserRequest;
  refresh: boolean;
}
