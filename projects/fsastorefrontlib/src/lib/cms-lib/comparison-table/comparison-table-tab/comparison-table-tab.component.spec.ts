import { Directive, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentSlotComponentData } from '@spartacus/core';
import { of } from 'rxjs';
import { CmsComponentData } from '@spartacus/storefront';
import { CMSComparisonTabComponent } from '../../../occ-models';
import { ComparisonTableTabComponent } from './comparison-table-tab.component';

@Directive({
  // tslint:disable
  selector: '[cxComponentWrapper]',
})
export class MockComponentWrapperDirective {
  @Input() cxComponentWrapper: ContentSlotComponentData;
}

describe('ComparisonTableTabComponent', () => {
  let comaparisonTableTabComponent: ComparisonTableTabComponent;
  let fixture: ComponentFixture<ComparisonTableTabComponent>;

  const componentData: CMSComparisonTabComponent = {
    uid: 'TestComparisonTabComponent',
    typeCode: 'CMSComparisonTabComponent',
    comparisonPanel: 'MockComparisonTablePanelComponent',
    title: 'TestCMSComparisonTabComponent'
  };

  const MockCmsComponentData = <CmsComponentData<CMSComparisonTabComponent>>{
    data$: of(componentData),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        ComparisonTableTabComponent,
        MockComponentWrapperDirective,
      ],
      providers: [
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonTableTabComponent);
    comaparisonTableTabComponent = fixture.componentInstance;
  });

  it('should create comparison tab component', () => {
    expect(comaparisonTableTabComponent).toBeTruthy();
  });
});
