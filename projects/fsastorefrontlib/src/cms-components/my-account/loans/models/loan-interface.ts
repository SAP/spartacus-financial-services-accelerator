import { Order, SearchConfig } from '@spartacus/core';
import { Pagination } from '@spartacus/core/src/model/unused.model';
import { Instalment } from './loan-instalment.interface';

export interface Loan {
  code: string;
  loanAmount: number;
  loanPurpose: string;
  loanTerm: string;
  order: Order;
  amountLeftToPay?: number;
  amountPayedSoFar?: number;
  fixedInterestRate?: number;
  instalmentAmount?: number;
  serviceFee?: number;
  numberOfInstalments?: number;
  repaymentFrequency?: string;
  startDate?: string;
  totalAmountToPay?: number;
  paidInstalments?: any[];
  notPaidInstalments?: Instalment[];
}

export interface CustomSearchConfig extends SearchConfig {
  sortOrder: string;
}

export interface LoanSearchData {
  loans: Loan[];
  pagination: Pagination;
}
