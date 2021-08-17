import { ElementRef, Injectable, QueryList, Renderer2 } from '@angular/core';
import { CmsService } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CMSComparisonTabComponent } from '../../occ/occ-models';

@Injectable()
export class ComparisonTableService {
  constructor(protected cmsService: CmsService) {}

  private availableTabSource = new BehaviorSubject<CMSComparisonTabComponent[]>(
    []
  );
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

  calculateHieght(
    tableCell: QueryList<ElementRef<HTMLElement>>,
    renderer: Renderer2
  ): Observable<any> {
    return tableCell.changes.pipe(
      map((data: QueryList<ElementRef<HTMLElement>>) => {
        const elementArray = data.toArray();
        const highestElem = elementArray.sort(
          (a, b) => a.nativeElement.clientHeight - b.nativeElement.clientHeight
        )[elementArray.length - 1];
        if (highestElem) {
          elementArray.forEach(elem => {
            renderer.setStyle(
              elem.nativeElement,
              'height',
              `${highestElem.nativeElement.clientHeight}px`
            );
          });
        }
      })
    );
  }
}
