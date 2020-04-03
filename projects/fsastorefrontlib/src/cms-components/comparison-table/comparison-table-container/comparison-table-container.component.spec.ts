import { DebugElement, Directive, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { CmsComponent, ContentSlotComponentData } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import {
  CMSComparisonTabComponent,
  CmsMultiComparisonTabContainer,
} from '../../../occ/occ-models';
import { ComparisonTableService } from '../comparison-table.service';
import { ComparisonTableContainerComponent } from './comparison-table-container.component';

@Directive({
  // tslint:disable
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

  const mockCmsComponentData = <CmsComponentData<CmsComponent>>{
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
          useValue: mockCmsComponentData,
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
