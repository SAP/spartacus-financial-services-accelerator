import {ChangeDetectionStrategy, Component, OnInit, Output} from '@angular/core';
import {CmsComponentData} from '@spartacus/storefront';
import {Observable} from 'rxjs';
import {ComparisonPanelCMSComponent} from '../../../../../occ-models';

@Component({
  selector: 'fsa-comparison-table-panel',
  templateUrl: './comparison-table-panel.component.html',
  styleUrls: ['./comparison-table-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonTablePanelComponent implements OnInit {

  billingEvents = [
    {
      code: 'paynow',
      name: 'Pay On Checkout'
    },
    {
      code: 'personalaccident',
      name: 'Personal Accident'
    },
    {
      code: 'curtailment',
      name: 'Curtailment'
    },
    {
      code: 'hospitalbenefit',
      name: 'Hospital Benefit'
    },
    {
      code: 'repatriation',
      name: 'Repatriation'
    },
    {
      code: 'baggage',
      name: 'Baggage'
    },
    {
      code: 'medicalexpenses',
      name: 'Medical Expenses'
    },
    {
      code: 'excesswaivercoverage',
      name: 'Excess Waiver'
    },
    {
      code: 'personalliabilitycoverage',
      name: 'Personal Liability'
    },
    {
      code: 'legalexpenses',
      name: 'Legal Expenses'
    },
    {
      code: 'supplierinsolvency',
      name: 'Supplier Insolvency'
    },
    {
      code: 'misseddeparture',
      name: 'Missed Departure'
    },
    {
      code: 'accommodationcover',
      name: 'Accommodation'
    },
    {
      code: 'cancellation ',
      name: 'Cancellation '
    },
    {
      code: 'delayeddeparture',
      name: 'Delayed Departure'
    },
    {
      code: 'safi',
      name: 'Safi'
    },
    {
      code: 'abandonmentcover',
      name: 'Abandonment'
    },
    {
      code: 'hijack',
      name: 'Hijack'
    },
    {
      code: 'personalmoney',
      name: 'Personal Money'
    },
    {
      code: 'petcare',
      name: 'Pet Care'
    }
  ];
  comparisonPanel: Observable<ComparisonPanelCMSComponent>;
  productList: string[];

  constructor(
    protected componentData: CmsComponentData<ComparisonPanelCMSComponent>,
  ) {
  }

  ngOnInit() {
    this.comparisonPanel = this.componentData.data$;
  }

  getProductList(): string[] {
    this.componentData.data$.subscribe(data => {
      this.productList = data.products.split(' ');
    });
    return this.productList;
  }
}
