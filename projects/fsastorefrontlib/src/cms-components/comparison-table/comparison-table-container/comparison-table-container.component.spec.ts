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
import { Observable, of } from 'rxjs';
import {
  CMSComparisonTabComponent,
  CmsMultiComparisonTabContainer,
} from '../../../occ/occ-models';
import { ComparisonTableContainerComponent } from './comparison-table-container.component';

@Directive({
  // tslint:disable
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

class MockCmsService {
  getComponentData(): Observable<CMSComparisonTabComponent> {
    return of(componentData);
  }
}

describe('ComparisonTableContainerComponent', () => {
  let comparisonTableContainer: ComparisonTableContainerComponent;
  let fixture: ComponentFixture<ComparisonTableContainerComponent>;
  let el: DebugElement;

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
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonTableContainerComponent);
    comparisonTableContainer = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create comparison table container', () => {
    expect(comparisonTableContainer).toBeTruthy();
  });

  it('should contain tabs', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.tab-content'))).toBeTruthy();
  });
});
