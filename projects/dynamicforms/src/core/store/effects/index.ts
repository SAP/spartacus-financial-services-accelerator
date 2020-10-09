import { FormDataEffects } from './form-data.effect';
import { FormDefinitionEffects } from './form-definition.effect';
import { UploadFilesEffects } from './upload.effect';

export const effects: any[] = [
  FormDefinitionEffects,
  FormDataEffects,
  UploadFilesEffects,
];

export * from './form-data.effect';
export * from './form-definition.effect';
export * from './upload.effect';
