import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { PaginationModel, RoutingService } from '@spartacus/core';
import {
  FormDataService,
  FormDataStorageService,
} from '@spartacus/dynamicforms';
import { BREAKPOINT, BreakpointService } from '@spartacus/storefront';
import { ECharts, EChartsOption } from 'echarts';
import {
  BehaviorSubject,
  combineLatest,
  fromEvent,
  Observable,
  of,
  ReplaySubject,
} from 'rxjs';
import {
  debounceTime,
  filter,
  first,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { FSCartService, FSProductService } from '../../../../core';
import { PricingService } from '../../../../core/product-pricing/facade/pricing.service';
import { PricingData } from '../../../../occ/occ-models/form-pricing.interface';
import { PaginationHelper } from '../../../../shared/util/helpers/pagination/PaginationHelper';
import { logger } from '../../../../shared/util/helpers/rxjs/logger';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'cx-fs-sales-illustration-main',
  templateUrl: './sales-illustration-main.component.html',
})
export class SalesIllustrationMainComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('nav') nav: QueryList<NgbNav>;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();

  pricingData$: Observable<PricingData>;

  productCode$: Observable<string>;
  product$: Observable<any>;
  tableData$: Observable<any>;

  eChartsInstance: ECharts;
  chartOptions$: Observable<EChartsOption>;

  pagination$: BehaviorSubject<PaginationModel> = new BehaviorSubject({
    currentPage: 0,
    pageSize: 5,
    totalPages: 0,
    totalResults: 0,
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: FSProductService,
    private formDataStorageService: FormDataStorageService,
    private formDataService: FormDataService,
    private pricingService: PricingService,
    private chartService: ChartService,
    private cartService: FSCartService,
    private routingService: RoutingService,
    private breakpointService: BreakpointService,
    public location: Location
  ) {}

  ngAfterViewInit(): void {
    combineLatest([this.breakpointService.breakpoint$, this.nav.changes])
      .pipe(
        tap(([breakpoint, change]) => {
          breakpoint === BREAKPOINT.xs ? change.first.select(2) : null;
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  ngOnInit(): void {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(300),
        tap(e => this.resizeChart()),
        takeUntil(this.destroyed$)
      )
      .subscribe();

    this.productCode$ = this.activatedRoute.params.pipe(
      map(param => param.savingsProductCode),
      logger('Product Code'),
      shareReplay()
    );

    this.pricingData$ = this.getPricingData();

    this.product$ = combineLatest([this.productCode$, this.pricingData$]).pipe(
      filter(
        ([_, pricingData]) => pricingData.priceAttributeGroups !== undefined
      ),
      switchMap(([productCode, pricingData]) =>
        this.productService.getCalculatedProductData(productCode, pricingData)
      ),
      filter(product => !!product),
      map((product: any) => this.formatProduct(product)),
      logger('Changed Product'),
      shareReplay()
    );

    this.chartOptions$ = this.product$.pipe(
      switchMap((product: any) =>
        this.chartService.getChartOptions(product.salesIllustrationDiagramData)
      )
    );

    this.tableData$ = this.pagination$.pipe(
      withLatestFrom(this.product$),
      map(([pagination, product]) => {
        const {
          contributionSeries,
          expectedSavingsSeries,
          interestSeries,
          years,
        } = product.salesIllustrationDiagramData;

        return {
          contributionSeries: PaginationHelper.getPaginationResults(
            pagination,
            contributionSeries
          ),
          expectedSavingsSeries: PaginationHelper.getPaginationResults(
            pagination,
            expectedSavingsSeries
          ),
          interestSeries: PaginationHelper.getPaginationResults(
            pagination,
            interestSeries
          ),
          years: PaginationHelper.getPaginationResults(pagination, years),
        };
      })
    );
  }

  onChartInit(ec: ECharts) {
    this.eChartsInstance = ec;
  }

  resizeChart() {
    if (this.eChartsInstance) {
      this.eChartsInstance.resize();
    }
  }

  onPageChange(currentPage: number) {
    this.pagination$.next({
      ...this.pagination$.value,
      currentPage,
    });
  }

  createCartAndStartBundleForProduct(
    productCode: string,
    bundleTemplateId: string
  ) {
    this.pricingData$
      .pipe(
        map(pricingData =>
          this.cartService.createCartForProduct(
            productCode,
            bundleTemplateId,
            1,
            pricingData
          )
        ),
        first()
      )
      .subscribe();

    this.routingService.go({ cxRoute: 'addOptions' });
  }

  private getPricingData(): Observable<PricingData> {
    return this.productCode$.pipe(
      switchMap(productCode =>
        this.productService.get(productCode).pipe(
          map((product: any) =>
            this.formDataStorageService.getFormDataIdByCategory(
              product?.defaultCategory?.code
            )
          ),
          switchMap(formDataId =>
            formDataId ? this.getFormData(formDataId) : of({})
          )
        )
      ),
      shareReplay(),
      logger('PricingData')
    );
  }

  private getFormData(formDataId: string): Observable<PricingData> {
    this.formDataService.loadFormData(formDataId);

    return this.formDataService.getFormData().pipe(
      map(formData => {
        if (formData.content) {
          return this.pricingService.buildPricingData(
            JSON.parse(formData.content)
          );
        }
      })
    );
  }

  private formatProduct(product) {
    const totalResults = product.salesIllustrationDiagramData?.length;

    this.pagination$.next({
      ...this.pagination$.value,
      totalResults,
      totalPages: Math.ceil(totalResults / this.pagination$.value.pageSize),
    });

    return {
      ...product,
      salesIllustrationDiagramData: product?.salesIllustrationDiagramData?.reduce(
        (accum, curr) => ({
          contributionSeries: [
            ...accum.contributionSeries,
            curr.contribution.toFixed(2),
          ],
          expectedSavingsSeries: [
            ...accum.expectedSavingsSeries,
            curr.expectedSavingAmount.toFixed(2),
          ],
          interestSeries: [
            ...accum.interestSeries,
            (curr.expectedSavingAmount - curr.contribution).toFixed(2),
          ],
          years: [...accum.years, new Date(curr.date).getUTCFullYear()],
        }),
        {
          contributionSeries: [],
          expectedSavingsSeries: [],
          interestSeries: [],
          years: [],
        }
      ),
    };
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
