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

  /**
   * Sets the min-height property of all elements in array to the highest one
   *
   * @param elementArray array of elements that will be resized
   * @param renderer reference to component's renderer
   */
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

  /**
   * Passes the elements for height calculation
   *
   * @param elemRef array of elements that will be passed for resizing
   * @param renderer reference to component's renderer
   * @param getHighestElement optional method that sets the highest element as a reference
   */
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

  /**
   * Executes height calculation on window resize
   *
   * @param winRef component's window reference
   * @param tableCell array of elements that will be passed for resizing
   * @param renderer reference to component's renderer
   * @param getHighestElement optional method that sets the highest element as a reference
   * @returns WindowRef observable
   */
  setHeightsAtResize(
    winRef: WindowRef,
    tableCell: QueryList<ElementRef<HTMLElement>>,
    renderer: Renderer2,
    getHighestElement?: Function
  ): Observable<WindowRef> {
    return winRef.resize$.pipe(
      tap(_ => {
        if (tableCell) {
          this.calculateHeights(tableCell, renderer, getHighestElement);
        }
      })
    );
  }
}
