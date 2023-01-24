import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultDocumentConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        signDocuments: 'users/${userId}/documents/sign-documents',
      },
    },
  },
};
