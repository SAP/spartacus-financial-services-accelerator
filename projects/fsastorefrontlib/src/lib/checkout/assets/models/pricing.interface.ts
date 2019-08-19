export interface PricingData {
    priceAttributeList?: PriceGroup[];
}

export interface PriceGroup {
    priceAttributesGroup?: string;
    priceAttributes?: PricingAttribute [];
}

export interface PricingAttribute {
    key: string;
    value: Object;
}
