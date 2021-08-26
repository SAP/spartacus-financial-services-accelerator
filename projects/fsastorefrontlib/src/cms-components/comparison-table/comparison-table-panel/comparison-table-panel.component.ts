import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, WindowRef } from '@spartacus/core';
import {
  FormDataService,
  FormDataStorageService,
} from '@spartacus/dynamicforms';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ComparisonTableService } from '../comparison-table.service';
import { BillingTimeConnector } from '../../../core/product-pricing/connectors/billing-time.connector';
import { PricingService } from '../../../core/product-pricing/facade/pricing.service';
import {
  ComparisonPanelCMSComponent,
  PricingData,
} from '../../../occ/occ-models';
import { UserAccountFacade } from '@spartacus/user/account/root';

@Component({
  selector: 'cx-fs-comparison-table-panel',
  templateUrl: './comparison-table-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTablePanelComponent
  implements OnInit, AfterViewInit, OnDestroy {
  private subscription = new Subscription();
  comparisonPanel$: Observable<ComparisonPanelCMSComponent>;
  productList: string[];
  billingData$: Observable<any>;
  pricingData$: Observable<PricingData>;
  categoryCode: string;
  @ViewChildren('tableCell') tableCell: QueryList<ElementRef<HTMLElement>>;

  constructor(
    protected componentData: CmsComponentData<ComparisonPanelCMSComponent>,
    protected billingTimeConnector: BillingTimeConnector,
    protected formDataService: FormDataService,
    protected pricingService: PricingService,
    protected formDataStorageService: FormDataStorageService,
    protected userAccountFacade: UserAccountFacade,
    protected activatedRoute: ActivatedRoute,
    protected comparisonTableService: ComparisonTableService,
    protected renderer: Renderer2,
    protected winRef: WindowRef
  ) {}

  user$: Observable<User> = this.userAccountFacade.get();

  ngOnInit() {
    this.comparisonPanel$ = this.componentData.data$;
    this.subscription
      .add(
        this.comparisonPanel$
          .pipe(
            map(data => {
              const productCodes = data.products.split(' ');
              this.billingData$ = this.billingTimeConnector.getBillingTimes(
                productCodes
              );
            })
          )
          .subscribe()
      )
      .add(
        this.activatedRoute.params
          .pipe(
            map(params => {
              this.categoryCode = params['categoryCode'];
            })
          )
          .subscribe()
      );

    const formDataId = this.formDataStorageService.getFormDataIdByCategory(
      this.categoryCode
    );
    if (formDataId) {
      this.formDataService.loadFormData(formDataId);
      this.pricingData$ = this.formDataService.getFormData().pipe(
        map(formData => {
          if (formData.content) {
            return this.pricingService.buildPricingData(
              JSON.parse(formData.content)
            );
          }
        })
      );
    } else {
      this.pricingData$ = of({});
    }
  }

  getHighestElement(elementArray: ElementRef<HTMLElement>[]) {
    this.comparisonTableService.highestElement = elementArray.sort(
      (a, b) => a.nativeElement.clientHeight - b.nativeElement.clientHeight
    )[elementArray.length - 1];
  }

  setRowHeights() {
    this.subscription.add(
      this.winRef.resize$
        .pipe(
          tap(_ => {
            if (this.tableCell) {
              this.comparisonTableService.calculateHeights(
                this.tableCell,
                this.renderer,
                this.getHighestElement.bind(this)
              );
            }
          })
        )
        .subscribe()
    );
  }

  ngAfterViewInit() {
    this.subscription.add(
      this.tableCell.changes
        .pipe(
          filter(el => el.length > 0),
          map((elemRef: QueryList<ElementRef<HTMLElement>>) => {
            this.comparisonTableService.calculateHeights(
              elemRef,
              this.renderer,
              this.getHighestElement.bind(this)
            );
          })
        )
        .subscribe()
    );
    this.setRowHeights();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
