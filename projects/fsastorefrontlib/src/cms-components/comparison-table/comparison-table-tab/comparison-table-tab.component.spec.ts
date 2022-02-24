import { DebugElement, Directive, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CmsComponent, ContentSlotComponentData } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CMSComparisonTabComponent } from '../../../occ/occ-models';
import { ComparisonTableTabComponent } from './comparison-table-tab.component';

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

const mockCmsComponentData = <CmsComponentData<CmsComponent>>{
  data$: of(componentData),
  uid: 'componentDataTest',
};

describe('ComparisonTableTabComponent', () => {
  let comparisonTableTabComponent: ComparisonTableTabComponent;
  let fixture: ComponentFixture<ComparisonTableTabComponent>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgbNavModule],
        declarations: [
          ComparisonTableTabComponent,
          MockComponentWrapperDirective,
        ],
        providers: [
          {
            provide: CmsComponentData,
            useValue: mockCmsComponentData,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonTableTabComponent);
    comparisonTableTabComponent = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create comparison table tab component', () => {
    expect(comparisonTableTabComponent).toBeTruthy();
  });

  it('should render comparison table tab content', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.table-tab'))).toBeTruthy();
  });
});
