import { Schema } from '@spartacus/schematics/src/add-spartacus/schema';

export interface FSSchema extends Schema {
  clientId?: string;
  clientSecret?: string;
  consignmentTracking?: boolean;
}
