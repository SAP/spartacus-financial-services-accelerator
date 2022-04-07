import {
  ElementRef,
  QueryList,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { CmsService, WindowRef } from '@spartacus/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CMSComparisonTabComponent } from './../../occ/occ-models/cms-component.models';
import { ComparisonTableService } from './comparison-table.service';

const componentData: CMSComparisonTabComponent = {
  uid: 'testComparisonTab',
  typeCode: '"CMSComparisonTabComponent"',
  comparisonPanel: {
    uid: 'testComparisonPanel',
    products: 'TEST_PRODUCT_1 TEST_PRODUCT_2',
  },
};

const tableCellTitleArray = [
  'Lorem ipsum',
  'Dolor sit amet',
  'Consectetur adipiscing elit',
  'Fusce mollis',
  'Nibh eu justo',
];

function createTableCells(): QueryList<ElementRef<HTMLElement>> {
  const queryList = new QueryList<ElementRef<HTMLElement>>();
  const elementRefs = [];
  const tableCellWrapper = document.createElement('div');
  tableCellWrapper.className = 'table-cell-wrapper';
  tableCellWrapper.style.width = '130px';
  document.body.append(tableCellWrapper);
  for (let i = 0; i < tableCellTitleArray.length; i++) {
    const tableCell = document.createElement('div');
    tableCell.className = `table-cell`;
    tableCell.innerHTML = `<span class="table-cell-title">${tableCellTitleArray[i]}</span>`;
    const elementElementRef = new ElementRef(tableCell);
    elementRefs.push(elementElementRef);
    tableCellWrapper.append(tableCell);
  }
  queryList.reset(elementRefs);
  return queryList;
}

class MockCmsService {
  getComponentData(): Observable<CMSComparisonTabComponent> {
    return of(componentData);
  }
}

describe('ComparisonTableService', () => {
  let service: ComparisonTableService;
  let windowRef: WindowRef;
  let tableCells: QueryList<ElementRef<HTMLElement>>;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ComparisonTableService,
        { provide: CmsService, useClass: MockCmsService },
      ],
    });
    service = TestBed.inject(ComparisonTableService);
    windowRef = TestBed.inject(WindowRef);
    tableCells = createTableCells();
  });

  it('should inject CmsService', inject(
    [CmsService],
    (cmsService: CmsService) => {
      expect(cmsService).toBeTruthy();
    }
  ));

  it('test set available tabs', () => {
    service.setAvailableTabs([componentData]);
    service.availableTab$
      .subscribe(result => {
        expect(result).toEqual([componentData]);
      })
      .unsubscribe();
  });

  it('should equalize min-height of all table-cells', inject(
    [RendererFactory2],
    (factory: RendererFactory2) => {
      renderer = factory.createRenderer(null, null);

      const arrayedElements = tableCells.toArray();

      service.highestElement = arrayedElements.sort(
        (a, b) => a.nativeElement.clientHeight - b.nativeElement.clientHeight
      )[arrayedElements.length - 1];

      service.setEqualElementsHeights(arrayedElements, renderer);

      arrayedElements.map(elem =>
        expect(elem.nativeElement.clientHeight).toEqual(
          service.highestElement.nativeElement.clientHeight
        )
      );
    }
  ));

  it('should NOT equalize min-height of all table-cells', inject(
    [RendererFactory2],
    (factory: RendererFactory2) => {
      renderer = factory.createRenderer(null, null);
      const arrayedElements = tableCells.toArray();
      service.highestElement = undefined;
      service.setEqualElementsHeights(arrayedElements, renderer);
      arrayedElements.map(elem =>
        expect(elem.nativeElement.style.minHeight).toBe('')
      );
    }
  ));

  it('should calculate heights of elements with the highest element passed', inject(
    [RendererFactory2],
    (factory: RendererFactory2) => {
      renderer = factory.createRenderer(null, null);

      function getHighestElement(elementArray: ElementRef<HTMLElement>[]) {
        service.highestElement = elementArray.sort(
          (a, b) => a.nativeElement.clientHeight - b.nativeElement.clientHeight
        )[elementArray.length - 1];
      }
      spyOn(service, 'calculateHeights').and.callThrough();
      service.calculateHeights(tableCells, renderer, getHighestElement);

      expect(service.calculateHeights).toHaveBeenCalledWith(
        tableCells,
        renderer,
        getHighestElement
      );
    }
  ));

  it('should calculate heights of elements without the highest element passed', inject(
    [RendererFactory2],
    (factory: RendererFactory2) => {
      renderer = factory.createRenderer(null, null);

      spyOn(service, 'calculateHeights').and.callThrough();
      service.calculateHeights(tableCells, renderer);

      expect(service.calculateHeights).toHaveBeenCalledWith(
        tableCells,
        renderer
      );
    }
  ));

  it('should equalize elements at window resize', inject(
    [RendererFactory2],
    (factory: RendererFactory2) => {
      renderer = factory.createRenderer(null, null);

      function getHighestElement(elementArray: ElementRef<HTMLElement>[]) {
        service.highestElement = elementArray.sort(
          (a, b) => a.nativeElement.clientHeight - b.nativeElement.clientHeight
        )[elementArray.length - 1];
      }

      spyOn(service, 'setHeightsAtResize').and.callThrough();
      service.setHeightsAtResize(
        windowRef,
        tableCells,
        renderer,
        getHighestElement
      );

      expect(service.setHeightsAtResize).toHaveBeenCalledWith(
        windowRef,
        tableCells,
        renderer,
        getHighestElement
      );
    }
  ));
});
