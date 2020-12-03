import { FormOccConfig } from '../../config/form-occ-config';

export const defaultOccFormConfig: FormOccConfig = {
  backend: {
    occ: {
      endpoints: {
        formDefinitions: 'formDefinitions',
        formDefinition: 'formDefinitions/${formDefinitionId}',
        formData: 'users/${userId}/formData/${formDataId}',
        createFormData: 'users/${userId}/formData',
        getFile: 'users/${userId}/documents/${fileCode}',
        getFiles: 'users/${userId}/documents',
        uploadFile: 'users/${userId}/documents',
        removeFile: 'users/${userId}/documents/${fileCode}',
      },
    },
  },
};
