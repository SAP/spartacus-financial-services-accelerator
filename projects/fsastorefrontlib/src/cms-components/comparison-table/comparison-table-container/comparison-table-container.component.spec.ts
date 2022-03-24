import { DebugElement, Directive, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {
  CmsComponent,
  ContentSlotComponentData,
  CmsService,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of, Subject } from 'rxjs';
import {
  CMSComparisonTabComponent,
  CmsMultiComparisonTabContainer,
} from '../../../occ/occ-models';
import { ComparisonTableService } from '../comparison-table.service';
import { ComparisonTableContainerComponent } from './comparison-table-container.component';

@Directive({
  // eslint-disable-next-line
  selector: '[cxComponentWrapper]',
})
export class MockComponentWrapperDirective {
  @Input() cxComponentWrapper: ContentSlotComponentData;
}

const componentData: CMSComparisonTabComponent = {
  uid: 'testComparisonTab',
  typeCode: '"CMSComparisonTabComponent"',
  comparisonPanel: {
    uid: 'testComparisonPanel',
    products: 'TEST_PRODUCT_1 TEST_PRODUCT_2',
  },
};

class ComparisonTableContainerComponentExtended extends ComparisonTableContainerComponent {
  getAvailableTabsSortedByTitleExtended(): Observable<
    CMSComparisonTabComponent[]
  > {
    return super.getAvailableTabsSortedByTitle();
  }
}

class MockCmsService {
  getComponentData(): Observable<CMSComparisonTabComponent> {
    return of(componentData);
  }
}

class MockComparisonTableService {
  availableTab = new Subject<CMSComparisonTabComponent[]>();
  setAvailableTabs() {}
}

describe('ComparisonTableContainerComponent', () => {
  let comparisonTableContainer: ComparisonTableContainerComponent;
  let comparisonTableContainerComponentExtended: ComparisonTableContainerComponentExtended;
  let fixture: ComponentFixture<ComparisonTableContainerComponent>;
  let fixtureExtended: ComponentFixture<ComparisonTableContainerComponentExtended>;
  let el: DebugElement;
  let elex: DebugElement;

  const componentData: CmsMultiComparisonTabContainer = {
    uid: 'TestMultiComparisonTabContainer',
    typeCode: 'CmsMultiComparisonTabContainer',
    simpleCMSComponents: 'tab1,tab2,tab3',
  };

  const mockCmsComponentData = <CmsComponentData<CmsComponent>>{
    data$: of(componentData),
    uid: 'test',
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgbNavModule],
        declarations: [
          ComparisonTableContainerComponent,
          MockComponentWrapperDirective,
        ],
        providers: [
          {
            provide: CmsComponentData,
            useValue: mockCmsComponentData,
          },
          { provide: CmsService, useClass: MockCmsService },
          {
            provide: ComparisonTableService,
            useClass: MockComparisonTableService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonTableContainerComponent);
    comparisonTableContainer = fixture.componentInstance;
    el = fixture.debugElement;
  });

  beforeEach(() => {
    fixtureExtended = TestBed.createComponent(
      ComparisonTableContainerComponentExtended
    );
    comparisonTableContainerComponentExtended =
      fixtureExtended.componentInstance;
    elex = fixture.debugElement;
  });

  it('should create comparison table container', () => {
    fixture.detectChanges();
    expect(comparisonTableContainer).toBeTruthy();
  });

  describe('getAvailableTabsSortedByTitle', () => {
    it('should get the available tabs sorted by title', () => {
      (done: DoneFn) => {
        comparisonTableContainerComponentExtended
          .getAvailableTabsSortedByTitleExtended()
          .subscribe(value => {
            expect(value).toBeObservable();
            done();
          });
      };
    });
  });
});
