import { FormDataEffects } from './form-data.effect';
import { FormDefinitionEffects } from './form-definition.effect';
import { FilesEffect } from './file.effect';

export const effects: any[] = [
  FormDefinitionEffects,
  FormDataEffects,
  FilesEffect,
];

export * from './form-data.effect';
export * from './form-definition.effect';
export * from './file.effect';
