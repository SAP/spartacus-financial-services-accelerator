import { ElementRef, Injectable, QueryList, Renderer2 } from '@angular/core';
import { CmsService, WindowRef } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CMSComparisonTabComponent } from '../../occ/occ-models';

@Injectable()
export class ComparisonTableService {
  constructor(protected cmsService: CmsService) {}

  private availableTabSource = new BehaviorSubject<CMSComparisonTabComponent[]>(
    []
  );
  readonly availableTab$ = this.availableTabSource.asObservable();

  highestElement: ElementRef<HTMLElement>;

  setAvailableTabs(tabs: CMSComparisonTabComponent[]) {
    this.availableTabSource.next(tabs);
  }

  setEqualElementsHeights(
    elementArray: ElementRef<HTMLElement>[],
    renderer: Renderer2
  ) {
    elementArray.forEach(elem => {
      renderer.setStyle(
        elem.nativeElement,
        'min-height',
        `${this.highestElement?.nativeElement.clientHeight}px`
      );
    });
  }

  calculateHeights(
    elemRef: QueryList<ElementRef<HTMLElement>>,
    renderer: Renderer2,
    getHighestElement?: Function
  ) {
    const elementArray = elemRef.toArray();
    if (getHighestElement) {
      getHighestElement(elementArray);
    }
    this.setEqualElementsHeights(elementArray, renderer);
  }

  setHeightsAtResize(
    winRef: WindowRef,
    tableCell: QueryList<ElementRef<HTMLElement>>,
    renderer: Renderer2,
    getHighestElement?: Function
  ) {
    return winRef.resize$.pipe(
      tap(_ => {
        if (tableCell) {
          this.calculateHeights(tableCell, renderer, getHighestElement);
        }
      })
    );
  }

  /**
   * @deprecated since 2.0
   * Service is no longer used anywhere, instead, cmsService.getComponentData() method is used directly in the component
   */
  getComparisonTabs(tabIds: string[]): Observable<CMSComparisonTabComponent>[] {
    return tabIds.map(tabId => this.cmsService.getComponentData(tabId));
  }
}
