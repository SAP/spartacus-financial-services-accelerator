import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserService } from '@spartacus/core';
import {
  FormDataService,
  FormDataStorageService,
} from '@spartacus/dynamicforms';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BillingTimeConnector } from '../../../core/product-pricing/connectors/billing-time.connector';
import { PricingService } from '../../../core/product-pricing/facade/pricing.service';
import {
  ComparisonPanelCMSComponent,
  PricingData,
} from '../../../occ/occ-models';

@Component({
  selector: 'cx-fs-comparison-table-panel',
  templateUrl: './comparison-table-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTablePanelComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  comparisonPanel$: Observable<ComparisonPanelCMSComponent>;
  productList: string[];
  billingData$: Observable<any>;
  pricingData$: Observable<PricingData>;
  categoryCode: string;

  constructor(
    protected componentData: CmsComponentData<ComparisonPanelCMSComponent>,
    protected billingTimeConnector: BillingTimeConnector,
    protected formDataService: FormDataService,
    protected pricingService: PricingService,
    protected formDataStorageService: FormDataStorageService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute
  ) {}

  user$: Observable<User> = this.userService.get();

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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
