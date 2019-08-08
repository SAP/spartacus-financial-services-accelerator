import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class PricingService {

    constructor() { }

    pricingSource = new BehaviorSubject<any>('');
    pricingObject = this.pricingSource.asObservable();
    pricingAttributesList = {};

    public getPricingAttributes(): any {
        this.pricingObject.subscribe( obj => {
            this.pricingAttributesList = obj;
        });
        return this.pricingAttributesList;
    }

    public setPricingAttributes(pricingObj: any) {
        this.pricingSource.next(pricingObj);
    }
}
