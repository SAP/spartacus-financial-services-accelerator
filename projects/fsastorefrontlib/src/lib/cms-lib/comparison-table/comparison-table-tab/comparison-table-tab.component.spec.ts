import { Directive, Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CmsComponent, ContentSlotComponentData } from '@spartacus/core';
import { of } from 'rxjs';
import { CmsComponentData } from '@spartacus/storefront';
import { CMSComparisonTabComponent } from '../../../occ-models';
import { ComparisonTableTabComponent } from './comparison-table-tab.component';
import { OccBillingTimeService } from './../../../occ/billing-time/billing-time.service';

@Directive({
  // tslint:disable
  selector: '[cxComponentWrapper]',
})
export class MockComponentWrapperDirective {
  @Input() cxComponentWrapper: ContentSlotComponentData;
}

class MockOccBillingTimeService {
  getBillingTimes(productCodes: string[]): any {}
}

describe('ComparisonTableTabComponent', () => {
  let comaparisonTableTabComponent: ComparisonTableTabComponent;
  let fixture: ComponentFixture<ComparisonTableTabComponent>;

  const componentData: CMSComparisonTabComponent = {
    uid: 'TestComparisonTabComponent',
    typeCode: 'CMSComparisonTabComponent',
  };

  const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
    data$: of(componentData),
    uid: 'testComponent',
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
        {
          provide: OccBillingTimeService,
          useValue: MockOccBillingTimeService,
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
