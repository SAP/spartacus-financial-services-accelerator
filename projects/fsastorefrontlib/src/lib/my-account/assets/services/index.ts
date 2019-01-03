import { ClaimService } from './claim.service';
import { ClaimDataService } from './claim-data.service';
import { QuoteDataService } from './quote-data.service';
import { PolicyService } from './policy.service';
import { PolicyDataService } from './policy-data.service';
import { QuoteService } from './quote.service';
import { PremiumCalendarService } from './premium-calendar.service';

export const services: any[] = [
  QuoteService,
  QuoteDataService,
  PolicyService,
  PolicyDataService,
  ClaimService,
  ClaimDataService,
  PremiumCalendarService
];

export * from './quote.service';
export * from './quote-data.service';
export * from './policy.service';
export * from './policy-data.service';
export * from './claim.service';
export * from './claim-data.service';
export * from './premium-calendar.service';
