import { OccConfig } from '@spartacus/core';
import { FSOccEndpoints } from '../occ-models/fs-occ-endpoints.model';

export abstract class FSOccConfig extends OccConfig {
  backend?: {
    occ?: {
      endpoints?: FSOccEndpoints;
    };
  };
}
