import { Injectable } from '@angular/core';
import { CmsService } from '@spartacus/core';
import { Subject, Observable } from 'rxjs';
import { CMSComparisonTabComponent } from '../../occ/occ-models';

@Injectable()
export class ComparisonTableService {
  constructor(protected cmsService: CmsService) {}

  private availableTabSource = new Subject<CMSComparisonTabComponent[]>();
  readonly availableTab$ = this.availableTabSource.asObservable();

  setAvailableTabs(tabs: CMSComparisonTabComponent[]) {
    this.availableTabSource.next(tabs);
  }

  /**
   * @deprecated since 2.0
   * Service is no longer used anywhere, instead, cmsService.getComponentData() method is used directly in the component
   */
  getComparisonTabs(tabIds: string[]): Observable<CMSComparisonTabComponent>[] {
    return tabIds.map(tabId => this.cmsService.getComponentData(tabId));
  }
}
