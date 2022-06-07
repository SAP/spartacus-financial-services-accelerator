import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultAppointmentSchedulingConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        createAppointment: 'users/${userId}/appointments',
      },
    },
  },
};
