import { FormOccConfig } from '../../config/form-occ-config';

export const defaultOccFormConfig: FormOccConfig = {
  backend: {
    occ: {
      endpoints: {
        definition: 'forms/definitions/${formDefinitionId}',
        definitionForCategory: 'forms/definitions',
        formData: 'forms/formData/${formDataId}',
        createFormData: 'forms/formData',
      },
    },
  },
};
