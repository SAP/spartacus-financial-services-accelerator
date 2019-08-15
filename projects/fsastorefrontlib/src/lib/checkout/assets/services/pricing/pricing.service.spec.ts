import { async, TestBed } from '@angular/core/testing';
import { PricingService } from './pricing.service';

const formData = {
   'trip': {
        'costOfTrip' : 2300,
        'tripDestination': 'Europe',
        'tripStartDate': '2019-08-15',
   }
};

describe('PricingService', () => {
    let service: PricingService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PricingService]
          });

        service = TestBed.get(PricingService);
    });

    describe('buildPricingData', () => {
        it('should build price data based on form values', async(() => {
        service.buildPricingData(formData);
        expect(service.pricingAttributesData.priceAttributeList.length).toEqual(1);
        expect(service.pricingAttributesData.priceAttributeList[0].priceAttributes.length).toEqual(3);
        }));
    });
});
