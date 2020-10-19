import { FormOccConfig } from '../../config/form-occ-config';

export const defaultOccFormConfig: FormOccConfig = {
  backend: {
    occ: {
      endpoints: {
        definition: 'forms/definitions/${formDefinitionId}',
        definitions: 'forms/definitions',
        formData: 'forms/users/${userId}/formData/${formDataId}',
        createFormData: 'forms/users/${userId}/formData',
        getFile: 'users/${userId}/documents/${fileCode}',
        uploadFile: 'users/${userId}/documents',
        removeFile: 'users/${userId}/documents/${fileCode}',
      },
    },
  },
};
