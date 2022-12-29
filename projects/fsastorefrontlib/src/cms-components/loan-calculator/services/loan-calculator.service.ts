import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { LoanCalculatorAdapter } from './loan-calculator.adapter';

@Injectable()
export class LoanCalculatorService implements LoanCalculatorAdapter {
  constructor(
    private http: HttpClient,
    private occEndpointService: OccEndpointsService
  ) {}

  formValuesChanged = (prev, curr) =>
    prev.loanAmount === curr.loanAmount &&
    prev.loanDuration === curr.loanDuration &&
    prev.repaymentFrequency === curr.repaymentFrequency;

  getAnnuity(
    { loanAmount, loanDuration, repaymentFrequency },
    product: string
  ): Observable<any> {
    const url = this.occEndpointService.buildUrl(
      `fsproducts/${product}/calculation`,
      {
        queryParams: {
          fields: 'DEFAULT',
          lang: 'en',
          curr: 'EUR',
        },
      }
    );

    const body = {
      priceAttributeGroups: [
        {
          priceAttributes: [
            {
              key: 'loan-amount',
              value: `${loanAmount}`,
            },
            {
              key: 'loan-term',
              value: `${loanDuration}-year`,
            },
            {
              key: 'repayment-frequency',
              value: repaymentFrequency,
            },
          ],
          name: 'loan',
        },
      ],
    };

    return this.http.post(url, body);
  }

  getRepaymentFrequencies(
    catalogId: string = 'financialProductCatalog',
    valueListId: string = 'repaymentFrequency'
  ): Observable<any> {
    const url = this.occEndpointService.buildUrl(
      `catalogs/${catalogId}/valueLists/${valueListId}`
    );
    return this.http.get(url);
  }
}
