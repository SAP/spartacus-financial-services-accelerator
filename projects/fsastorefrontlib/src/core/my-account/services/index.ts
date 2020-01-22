import { ClaimService } from './claim.service';
import { ClaimDataService } from './claim-data.service';
import { PolicyService } from './policy.service';
import { QuoteService } from './quote.service';

export const services: any[] = [
  QuoteService,
  PolicyService,
  ClaimService,
  ClaimDataService,
];

export * from './quote.service';
export * from './policy.service';
export * from './claim.service';
export * from './claim-data.service';
