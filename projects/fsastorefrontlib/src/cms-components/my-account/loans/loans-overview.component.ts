import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CurrencyService, PaginationModel } from '@spartacus/core';
import { OboCustomerService } from '@spartacus/dynamicforms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CustomSearchConfig,
  Loan,
  LoanSearchData,
} from './models/loan-interface';
import { OccLoansAdapter } from './services/occ-loans.adapter';

@Component({
  selector: 'cx-fs-app-loans-overview',
  templateUrl: './loans-overview.component.html',
})
export class LoansOverviewComponent implements OnInit {
  activeLoans$: Observable<LoanSearchData>;
  loans: Loan[];
  currentCurrency$: Observable<any>;

  pagination: PaginationModel = {
    currentPage: 0,
    pageSize: 5,
    totalPages: 0,
    totalResults: 0,
  };

  userId: string;

  currentSortOder = 'asc';

  searchConfig: CustomSearchConfig = {
    pageSize: this.pagination.pageSize,
    currentPage: this.pagination.currentPage,
    sort: '',
    sortOrder: this.currentSortOder,
  };

  constructor(
    private currencyService: CurrencyService,
    private loansService: OccLoansAdapter
  ) {}

  ngOnInit(): void {
    this.currentCurrency$ = this.currencyService.getActive();
    this.refreshTableData(this.getPaginationPage());
  }

  getPaginationPage() {
    this.loansService.getLoans('current').pipe(
      map(loansObj => {
        this.pagination = {
          ...this.pagination,
          totalResults: loansObj.pagination.totalCount,
          totalPages: loansObj.pagination.totalPages,
        };
      })
    );
    return this.pagination.currentPage;
  }

  refreshTableData(pageIndex: number) {
    this.pagination = {
      ...this.pagination,
      currentPage: pageIndex,
    };

    this.searchConfig.currentPage = this.pagination.currentPage;
    this.searchConfig.pageSize = this.pagination.pageSize;

    this.activeLoans$ = this.loansService.getLoans('current').pipe(
      map(loansObj => {
        this.pagination = {
          ...this.pagination,
          totalResults: loansObj.pagination.totalCount,
          totalPages: loansObj.pagination.totalPages,
        };
        this.loans = loansObj.results;
        return loansObj;
      })
    );
  }
}
