export interface PricingData {
    priceAttributeList?: PricingAttributeGroup[];
}

export interface PricingAttributeGroup {
    priceAttributesGroup?: string;
    priceAttributes?: PricingAttribute [];
}

export interface PricingAttribute {
    key: string;
    value: Object;
}
