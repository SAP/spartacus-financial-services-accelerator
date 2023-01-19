import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultSignDocumentsConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        signDocuments: 'users/${userId}/documents/sign-documents',
      },
    },
  },
};
