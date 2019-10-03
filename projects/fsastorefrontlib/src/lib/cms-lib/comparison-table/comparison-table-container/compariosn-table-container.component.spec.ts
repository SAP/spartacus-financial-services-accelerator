import { DebugElement, Directive, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CmsComponent, ContentSlotComponentData } from '@spartacus/core';
import { of, Observable } from 'rxjs';
import { CmsComponentData } from '@spartacus/storefront';
import { By } from '@angular/platform-browser';
import { ComparisonTableContainerComponent } from './comparison-table-container.component';
import { CmsMultiComparisonTabContainer } from 'fsastorefrontlib/lib/occ-models';
import { CMSComparisonTabComponent } from '../../../occ-models';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { ComparisonTableService } from '../comparison-table.service';

@Directive({
  selector: '[cxComponentWrapper]',
})
export class MockComponentWrapperDirective {
  @Input() cxComponentWrapper: ContentSlotComponentData;
}

const mockedCMSComparisonTabComponent: CMSComparisonTabComponent = {
  name: 'Test1',
  title: 'Tab 1',
};

class MockComparisonTableService {
  getComparisonTabs(): Observable<CMSComparisonTabComponent>[] {
    return [of(mockedCMSComparisonTabComponent)];
  }
}

describe('ComparisonTableContainerComponent', () => {
  let comaparisonTableContainer: ComparisonTableContainerComponent;
  let mockComparisonTableService: MockComparisonTableService;
  let fixture: ComponentFixture<ComparisonTableContainerComponent>;
  let el: DebugElement;

  const componentData: CmsMultiComparisonTabContainer = {
    uid: 'TestMultiComparisonTabContainer',
    typeCode: 'CmsMultiComparisonTabContainer',
    simpleCMSComponents: 'tab1,tab2,tab3',
  };

  const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
    data$: of(componentData),
    uid: 'test',
  };

  beforeEach(async(() => {
    mockComparisonTableService = new MockComparisonTableService();
    TestBed.configureTestingModule({
      imports: [NgbTabsetModule],
      declarations: [
        ComparisonTableContainerComponent,
        MockComponentWrapperDirective,
      ],
      providers: [
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData,
        },
        {
          provide: ComparisonTableService,
          useValue: mockComparisonTableService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonTableContainerComponent);
    comaparisonTableContainer = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create comparison table container', () => {
    expect(comaparisonTableContainer).toBeTruthy();
  });

  it('should contain tabs', () => {
    fixture.detectChanges();
    expect(el.query(By.css('ngb-tabset'))).toBeTruthy();
  });
});
