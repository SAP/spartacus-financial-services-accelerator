import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccProductAssignmentConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        loadProductAssignments:
          '/users/${userId}/orgUnits/${orgUnitId}/fsProductAssignments',
        createProductAssignments:
          '/users/${userId}/orgUnits/${orgUnitId}/fsProductAssignments',
        removeProductAssignments:
          '/users/${userId}/orgUnits/${orgUnitId}/fsProductAssignments/${fsProductAssignmentCode}',
        updateProductAssignments:
          '/users/${userId}/orgUnits/${orgUnitId}/fsProductAssignments/${fsProductAssignmentCode}',
      },
    },
  },
};
