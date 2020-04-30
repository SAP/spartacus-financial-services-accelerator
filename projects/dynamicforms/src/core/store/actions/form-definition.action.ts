import { Action } from '@ngrx/store';

export const LOAD_FORM_DEFINITION = '[Form Definition] Load Form Definition';
export const LOAD_FORM_DEFINITION_FAIL =
  '[Form Definition] Load Form Definition Fail';
export const LOAD_FORM_DEFINITION_SUCCESS =
  '[Form Definition] Load Form Definition Success';

export class LoadFormDefinition implements Action {
  readonly type = LOAD_FORM_DEFINITION;
  constructor(public payload: any) {}
}

export class LoadFormDefinitionFail implements Action {
  readonly type = LOAD_FORM_DEFINITION_FAIL;
  constructor(public payload: any) {}
}

export class LoadFormDefinitionSuccess implements Action {
  readonly type = LOAD_FORM_DEFINITION_SUCCESS;
  constructor(public payload: any) {}
}

export type FormDefinitionAction =
  | LoadFormDefinition
  | LoadFormDefinitionFail
  | LoadFormDefinitionSuccess;
