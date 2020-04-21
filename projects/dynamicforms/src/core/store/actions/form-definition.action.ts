import { StateLoaderActions } from '@spartacus/core';
import { FORM_DEFINITION_DATA } from '../form-definition-state';

export const LOAD_FORM_DEFINITION = '[Form Definition] Load Form Definition';
export const LOAD_FORM_DEFINITION_FAIL =
  '[Form Definition] Load Form Definition Fail';
export const LOAD_FORM_DEFINITION_SUCCESS =
  '[Form Definition] Load Form Definition Success';

export class LoadFormDefinition extends StateLoaderActions.LoaderLoadAction {
  readonly type = LOAD_FORM_DEFINITION;
  constructor(public payload: any) {
    super(FORM_DEFINITION_DATA);
  }
}

export class LoadFormDefinitionFail extends StateLoaderActions.LoaderFailAction {
  readonly type = LOAD_FORM_DEFINITION_FAIL;
  constructor(public payload: any) {
    super(FORM_DEFINITION_DATA, payload);
  }
}

export class LoadFormDefinitionSuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = LOAD_FORM_DEFINITION_SUCCESS;
  constructor(public payload: any) {
    super(FORM_DEFINITION_DATA);
  }
}

export type FormDefinitionAction =
  | LoadFormDefinition
  | LoadFormDefinitionFail
  | LoadFormDefinitionSuccess;
