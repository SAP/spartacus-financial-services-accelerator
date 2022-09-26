import { waitForAsync, TestBed } from '@angular/core/testing';
import { FormDefinition } from '@spartacus/dynamicforms';
import { PricingService } from './pricing.service';

const formData = {
  trip: {
    costOfTrip: 2300,
    tripDestination: 'Europe',
    tripStartDate: '2019-08-15',
  },
};

const formDefinition: FormDefinition = {
  formId: 'test',
  formGroups: [
    {
      groupCode: 'trip',
      fieldConfigs: [
        {
          fieldType: 'currency',
          name: 'costOfTrip',
          required: true,
          value: 2300,
        },
        {
          fieldType: 'select',
          name: 'tripDestination',
          required: true,
          value: 'Europe',
        },
        {
          fieldType: 'date',
          name: 'tripStartDate',
          required: true,
          value: '2019-08-15',
        },
      ],
    },
  ],
};

describe('PricingService', () => {
  let service: PricingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PricingService],
    });

    service = TestBed.inject(PricingService);
  });

  describe('buildPricingData', () => {
    it(
      'should build price data based on form values',
      waitForAsync(() => {
        const pricingData = service.buildPricingData(formData);
        expect(pricingData.priceAttributeGroups.length).toEqual(1);
        expect(
          pricingData.priceAttributeGroups[0].priceAttributes.length
        ).toEqual(3);
      })
    );
  });

  describe('buildPricingDataWithFormDefinition', () => {
    it(
      'should build price data based on form values',
      waitForAsync(() => {
        const pricingData = service.buildPricingDataWithFormDefinition(
          formData,
          formDefinition
        );
        expect(pricingData.priceAttributeGroups.length).toEqual(1);
        expect(
          pricingData.priceAttributeGroups[0].priceAttributes.length
        ).toEqual(3);
      })
    );
  });
});
