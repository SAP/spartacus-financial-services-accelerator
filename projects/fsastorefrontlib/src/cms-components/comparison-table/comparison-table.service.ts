import { Injectable } from '@angular/core';
import { CmsService } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { CMSComparisonTabComponent } from '../../occ/occ-models';

/**
 * @deprecated since 2.0
 * Service is no longer used anywhere, instead, cmsService.getComponentData() method is used directly in the component
 */

@Injectable()
export class ComparisonTableService {
  constructor(protected cmsService: CmsService) {}

  getComparisonTabs(tabIds: string[]): Observable<CMSComparisonTabComponent>[] {
    return tabIds.map(tabId => this.cmsService.getComponentData(tabId));
  }
}
