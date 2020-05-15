import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccAgentConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        agents: '/agents',
        agent: '/agents/${userId}',
      },
    },
  },
};
