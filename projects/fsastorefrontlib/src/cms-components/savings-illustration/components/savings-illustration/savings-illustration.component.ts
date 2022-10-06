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
import { PaginationModel, RoutingService, WindowRef } from '@spartacus/core';
import {
  FormDataService,
  FormDataStorageService,
} from '@spartacus/dynamicforms';
import { BREAKPOINT, BreakpointService } from '@spartacus/storefront';
import { ECharts, EChartsOption } from 'echarts';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import {
  filter,
  map,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { FSCartService, FSProductService } from '../../../../core';
import { PricingService } from '../../../../core/product-pricing/facade/pricing.service';
import { SavingsIllustrationChartService } from '../../../../core/savings-illustration/facade/savings-illustration-chart.service';
import { FSProduct } from '../../../../occ';
import { PricingData } from '../../../../occ/occ-models/form-pricing.interface';
import { PaginationHelper } from '../../../../shared/util/helpers/pagination/PaginationHelper';

@Component({
  selector: 'cx-fs-savings-illustration',
  templateUrl: './savings-illustration.component.html',
  providers: [SavingsIllustrationChartService],
})
export class SavingsIllustrationComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('nav') tabNavigation: QueryList<NgbNav>;

  private subscription: Subscription = new Subscription();

  pricingData$: Observable<PricingData>;

  productCode$: Observable<string> = this.activatedRoute.params.pipe(
    map(param => param.savingsProductCode),
    shareReplay()
  );

  product$: Observable<FSProduct>;
  tableData$: Observable<any>;

  eChartsInstance: ECharts;
  chartOptions$: Observable<EChartsOption>;

  paginationRaw: PaginationModel = {
    currentPage: 0,
    pageSize: 5,
    totalPages: 0,
    totalResults: 0,
  };

  private paginationBehaviourSubject: BehaviorSubject<
    PaginationModel
  > = new BehaviorSubject(this.paginationRaw);

  pagination$: Observable<
    PaginationModel
  > = this.paginationBehaviourSubject.asObservable();

  constructor(
    protected winRef: WindowRef,
    protected activatedRoute: ActivatedRoute,
    protected productService: FSProductService,
    protected formDataStorageService: FormDataStorageService,
    protected formDataService: FormDataService,
    protected pricingService: PricingService,
    protected chartService: SavingsIllustrationChartService,
    protected cartService: FSCartService,
    protected breakpointService: BreakpointService,
    protected routingService: RoutingService
  ) {}

  ngAfterViewInit(): void {
    this.subscription.add(
      combineLatest([
        this.breakpointService.breakpoint$,
        this.tabNavigation.changes,
      ])
        .pipe(
          tap(([breakpoint, change]) => {
            if (breakpoint === BREAKPOINT.xs) {
              change.first.select(2);
            }
          })
        )
        .subscribe()
    );
  }

  ngOnInit(): void {
    this.subscription.add(
      this.winRef.resize$.pipe(tap(e => this.resizeChart())).subscribe()
    );

    this.pricingData$ = this.productCode$.pipe(
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
      shareReplay()
    );

    this.product$ = combineLatest([this.productCode$, this.pricingData$]).pipe(
      filter(([_, pricingData]) => !!pricingData?.priceAttributeGroups),
      switchMap(([productCode, pricingData]) =>
        this.productService.getCalculatedProductData(productCode, pricingData)
      ),
      filter(product => !!product),
      map((product: any) => this.formatProduct(product)),
      shareReplay()
    );

    this.chartOptions$ = this.product$.pipe(
      switchMap((product: any) =>
        this.chartService.getSavingsIllustrationChartOptions(
          product.salesIllustrationDiagramData
        )
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
    this.paginationRaw = {
      ...this.paginationRaw,
      currentPage,
    };

    this.paginationBehaviourSubject.next(this.paginationRaw);
  }

  createCartAndStartBundleForProduct(
    productCode: string,
    bundleTemplateId: string
  ) {
    this.subscription.add(
      this.pricingData$
        .pipe(
          map(pricingData =>
            this.cartService.createCartForProduct(
              productCode,
              bundleTemplateId,
              1,
              pricingData
            )
          )
        )
        .subscribe()
    );

    this.routingService.go({ cxRoute: 'addOptions' });
  }

  private getFormData(formDataId: string): Observable<PricingData> {
    this.formDataService.loadFormData(formDataId);

    return this.formDataService.getFormData().pipe(
      filter(formData => !!formData.content),
      map(formData =>
        this.pricingService.buildPricingData(JSON.parse(formData.content))
      )
    );
  }

  private formatProduct(product) {
    const totalResults = product.salesIllustrationDiagramData?.length;

    this.paginationRaw = {
      ...this.paginationRaw,
      totalResults,
      totalPages: Math.ceil(totalResults / this.paginationRaw.pageSize),
    };

    this.paginationBehaviourSubject.next(this.paginationRaw);

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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
