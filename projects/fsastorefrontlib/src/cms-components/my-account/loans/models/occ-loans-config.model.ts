import { OccConfig } from '@spartacus/core';
import { OccLoansEndpoints } from './occ-loans-endpoints.model';

export abstract class OccLoansConfig extends OccConfig {
  backend?: {
    occ?: {
      endpoints?: OccLoansEndpoints;
    };
  };
}
