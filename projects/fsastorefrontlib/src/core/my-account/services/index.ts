import { ClaimService } from './claim/claim.service';
import { ClaimDataService } from './claim/claim-data.service';
import { PolicyService } from './policy/policy.service';
import { QuoteService } from './quote/quote.service';

export const services: any[] = [
  QuoteService,
  PolicyService,
  ClaimService,
  ClaimDataService,
];

export * from './quote/quote.service';
export * from './policy/policy.service';
export * from './claim/claim.service';
export * from './claim/claim-data.service';
