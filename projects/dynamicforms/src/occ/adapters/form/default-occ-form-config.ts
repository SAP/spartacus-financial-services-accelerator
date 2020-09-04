import { FormOccConfig } from '../../config/form-occ-config';

export const defaultOccFormConfig: FormOccConfig = {
  backend: {
    occ: {
      endpoints: {
        definition: 'forms/definitions/${formDefinitionId}',
        definitions: 'forms/definitions',
        formData: 'forms/users/${userId}/formData/${formDataId}',
        createFormData: 'forms/users/${userId}/formData',
      },
    },
  },
};
