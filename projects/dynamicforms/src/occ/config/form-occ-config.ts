import { OccConfig } from '@spartacus/core';
import { FormOccEndpoints } from '../../core/models/form-occ-endpoints.model';

export abstract class FormOccConfig extends OccConfig {
  backend?: {
    occ?: {
      endpoints?: FormOccEndpoints;
    };
  };
}
