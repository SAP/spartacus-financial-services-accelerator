import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CmsService, ProductService } from '@spartacus/core';
import { CMSComparisonTabComponent, FSProduct } from '../../occ-models';

@Injectable()

export class ComparisonTableService {

  constructor(
    private cmsService: CmsService
  ) {}

  getComparisonTabs(tabIds: string[]): Observable<CMSComparisonTabComponent>[] {
    return tabIds.map(tabId => {
      return this.cmsService.getComponentData(tabId);
    });
  }
}
