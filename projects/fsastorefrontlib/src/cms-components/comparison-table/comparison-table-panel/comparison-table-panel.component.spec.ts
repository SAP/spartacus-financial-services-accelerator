import {
  Component,
  DebugElement,
  ElementRef,
  Input,
  QueryList,
} from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  FormDataService,
  FormDataStorageService,
  YFormData,
} from '@spartacus/dynamicforms';
import { NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CmsComponent } from '@spartacus/core';
import { CmsComponentData, MediaModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { BillingTimeConnector } from './../../../core/product-pricing/connectors/billing-time.connector';
import { PricingService } from './../../../core/product-pricing/facade/pricing.service';
import { ComparisonPanelCMSComponent } from './../../../occ/occ-models/cms-component.models';
import { PricingData } from './../../../occ/occ-models/form-pricing.interface';
import { ComparisonTableService } from '../comparison-table.service';
import { ComparisonTablePanelComponent } from './comparison-table-panel.component';
import { UserAccountFacade } from '@spartacus/user/account/root';

@Component({
  // eslint-disable-next-line
  selector: 'cx-fs-comparison-table-panel-item',
  template: '',
})
class ComparisonTablePanelItemComponent {
  @Input()
  productCode;
  @Input()
  billingTimes;
  @Input()
  pricingData;
}
const componentData: ComparisonPanelCMSComponent = {
  uid: 'testComparisonPanel',
  typeCode: 'ComparisonPanelCMSComponent',
  products: 'TEST_PRODUCT_1 TEST_PRODUCT_2',
};

const mockCmsComponentData = <CmsComponentData<CmsComponent>>{
  data$: of(componentData),
  uid: 'componentDataTest',
};

const billingTimes = [
  {
    code: 'petcare',
    name: 'Pet Care',
    helpContent: 'Test help content',
    orderNumber: 1,
  },
  {
    code: 'hospitalbenefit',
    name: 'Hospital Benefit',
    helpContent: 'Test help content',
    orderNumber: 2,
  },
];

const formData: YFormData = {
  id: 'test-formData',
  type: 'DATA',
  content:
    '{"testContent":{"tripDestination":"Europe","tripStartDate":"2022-02-02"}}',
};

const mockUser = {
  uid: 'test@email.com',
  name: 'testName',
};

let pricingData: PricingData;

class MockActivatedRoute {
  params = of();
}

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

class MockComparisonTableService {
  setAvailableTabs() {}
  calculateHeights() {}
  setHeightsAtResize() {
    return of();
  }
}

class MockFormDataStorageService {
  getFormDataIdByCategory() {
    return 'test-formData';
  }
}

class MockBillingTimeConnector {
  getBillingTimes(): Observable<any> {
    return of(billingTimes);
  }
}

class MockFormDataService {
  getFormData(): Observable<YFormData> {
    return of();
  }
  loadFormData(): void {}
}

class MockPricingService {
  buildPricingData(): PricingData {
    return pricingData;
  }
}

class MockUserAccountFacade {
  get() {
    return of(mockUser);
  }
}

describe('ComparisonTablePanelComponent', () => {
  let comparisonTablePanelComponent: ComparisonTablePanelComponent;
  let fixture: ComponentFixture<ComparisonTablePanelComponent>;
  let mockBillingTimeConnector: BillingTimeConnector;
  let mockFormDataService: FormDataService;
  let mockPricingService: PricingService;
  let mockFOrMDataStorageService: FormDataStorageService;
  let comparisonTableService: ComparisonTableService;
  let tableCells: QueryList<ElementRef<HTMLElement>>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgbNavModule, NgbTooltipModule, MediaModule],
        providers: [
          {
            provide: CmsComponentData,
            useValue: mockCmsComponentData,
          },
          {
            provide: BillingTimeConnector,
            useClass: MockBillingTimeConnector,
          },
          {
            provide: FormDataService,
            useClass: MockFormDataService,
          },
          {
            provide: PricingService,
            useClass: MockPricingService,
          },
          {
            provide: FormDataStorageService,
            useClass: MockFormDataStorageService,
          },
          {
            provide: ActivatedRoute,
            useClass: MockActivatedRoute,
          },
          {
            provide: UserAccountFacade,
            useClass: MockUserAccountFacade,
          },
          {
            provide: ComparisonTableService,
            useClass: MockComparisonTableService,
          },
        ],
        declarations: [
          ComparisonTablePanelComponent,
          ComparisonTablePanelItemComponent,
        ],
      }).compileComponents();
      mockBillingTimeConnector = TestBed.inject(BillingTimeConnector);
      mockFormDataService = TestBed.inject(FormDataService);
      mockPricingService = TestBed.inject(PricingService);
      mockFOrMDataStorageService = TestBed.inject(FormDataStorageService);
      comparisonTableService = TestBed.inject(ComparisonTableService);
      tableCells = createTableCells();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonTablePanelComponent);
    comparisonTablePanelComponent = fixture.componentInstance;

    pricingData = {
      priceAttributeGroups: [
        {
          name: 'test',
          priceAttributes: [
            {
              key: 'tripDestination',
              value: 'Europe',
            },
            {
              key: 'tripStartDate',
              value: '2022-02-02',
            },
          ],
        },
      ],
    };
    comparisonTablePanelComponent.pricingData$ = of(pricingData);

    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comparisonTablePanelComponent).toBeTruthy();
  });

  it('should create comparison panel with pricing data and billing times', () => {
    spyOn(mockFormDataService, 'getFormData').and.returnValue(of(formData));
    spyOn(mockPricingService, 'buildPricingData').and.returnValue(pricingData);
    comparisonTablePanelComponent.ngOnInit();

    let result;
    comparisonTablePanelComponent.pricingData$.subscribe(
      pricingData => (result = pricingData)
    );
    expect(result).toEqual(pricingData);
  });

  it('should not build pricing data', () => {
    const currentFormData: YFormData = {
      id: 'test-formData',
      type: 'DATA',
    };
    spyOn(mockPricingService, 'buildPricingData').and.stub();
    spyOn(mockFormDataService, 'getFormData').and.returnValue(
      of(currentFormData)
    );
    comparisonTablePanelComponent.ngOnInit();

    expect(mockPricingService.buildPricingData).not.toHaveBeenCalled();
  });

  it('should render billing times help content', () => {
    fixture.detectChanges();
    const billingTimeHelpContent = el.query(
      By.css('.table-cell-wrapper')
    ).nativeElement;
    expect(billingTimeHelpContent).toBeTruthy();
  });

  it('should not render comparison table panel item', () => {
    fixture.detectChanges();
    const comparisonTablePanelItem = el.query(
      By.css('cx-spinner')
    ).nativeElement;
    expect(comparisonTablePanelItem).toBeTruthy();
  });

  it('should get the highest element in the array and set it in service property', () => {
    const tableCellsArray = tableCells.toArray();
    comparisonTablePanelComponent['getHighestElement'](tableCellsArray);
    fixture.detectChanges();
    expect(
      comparisonTableService.highestElement.nativeElement.clientHeight
    ).toEqual(39);
  });
});
