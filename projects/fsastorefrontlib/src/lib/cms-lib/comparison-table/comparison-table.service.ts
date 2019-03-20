import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProductService, CmsService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsMultiComparisonTabContainer, FSProduct, OneTimeChargeEntry, CMSComparisonTabComponent } from '../../occ-models';
import { FSCartService } from '../../checkout/assets/services';

@Injectable()

export class ComparisonTableService {

  constructor(
    private componentData: CmsComponentData<CmsMultiComparisonTabContainer>,
    private productService: ProductService,
    private cartServiceFS: FSCartService,
    private cmsService: CmsService
  ) {}

  private comparisonTabList: string[];
  private productFS: Observable<FSProduct>;
  private panelItemEntries: OneTimeChargeEntry[] = [];
  private cmsComponentTab: Observable<CMSComparisonTabComponent>;

  getComponentData() {
    return this.componentData;
  }

  getCartServiceFS() {
    return this.cartServiceFS;
  }

  getProductFS() {
    return this.productFS;
  }

  getPanelItemEntries() {
    return this.panelItemEntries;
  }

  getComparisonTabList(component: Observable<CmsMultiComparisonTabContainer>): string[] {
    component.subscribe(data => {
      this.comparisonTabList = data.simpleCMSComponents.split(' ');
    });
    return this.comparisonTabList.slice();
  }

  getProductData(productCode: string): Observable<FSProduct> {
    return this.productFS = this.productService.get(productCode);
  }

  getTabNames(comparisonTableContainer: Observable<CmsMultiComparisonTabContainer>): string [] {
    const tabNames = [];
    this.getComparisonTabList(comparisonTableContainer).map(tabCode => {
      this.cmsComponentTab = this.cmsService.getComponentData(tabCode);
      this.cmsComponentTab.subscribe(info => tabNames.push(info.title));
    });
    return tabNames;
  }
}
