import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  CHANGE_REQUEST_FEATURE,
  ChangeRequestsState,
  StateWithChangeRequest,
} from '../change-request-state';

export const getChangeRequestState: MemoizedSelector<
  StateWithChangeRequest,
  ChangeRequestsState
> = createFeatureSelector<ChangeRequestsState>(CHANGE_REQUEST_FEATURE);
