import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultDocumentConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        documents: 'users/${userId}/documents/${documentId}',
      },
    },
  },
};
