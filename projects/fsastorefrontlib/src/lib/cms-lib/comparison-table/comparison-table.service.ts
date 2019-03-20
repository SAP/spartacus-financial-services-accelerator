import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProductService, CmsService } from '@spartacus/core';
import { CmsMultiComparisonTabContainer, FSProduct, OneTimeChargeEntry, CMSComparisonTabComponent } from '../../occ-models';
import { FSCartService } from '../../checkout/assets/services';

@Injectable()

export class ComparisonTableService {

  constructor(
    private productService: ProductService,
    private cmsService: CmsService
  ) {}

  private comparisonTabList: string[];
  protected productFS: Observable<FSProduct>;
  private panelItemEntries: OneTimeChargeEntry[] = [];
  private cmsComponentTab: Observable<CMSComparisonTabComponent>;

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

  // getTabNames(comparisonTableContainer: string[]): string [] {
  //   const tabNames = [];
  //   this.getComparisonTabList(comparisonTableContainer).map(tabCode => {
  //     this.cmsComponentTab = this.cmsService.getComponentData(tabCode);
  //     this.cmsComponentTab.subscribe(info => tabNames.push(info.title));
  //   });
  //   return tabNames;
  // }
  getTabNames(comparisonTableContainer: Observable<CmsMultiComparisonTabContainer>): string [] {
    const tabNames = [];
    this.getComparisonTabList(comparisonTableContainer).map(tabCode => {
      this.cmsComponentTab = this.cmsService.getComponentData(tabCode);
      this.cmsComponentTab.subscribe(info => tabNames.push(info.title));
    });
    return tabNames;
  }
}
