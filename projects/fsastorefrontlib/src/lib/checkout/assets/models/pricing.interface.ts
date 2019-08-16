export interface PricingData {
    groups?: PricingAttributeGroup[];
}

export interface PricingAttributeGroup {
    groupName?: string;
    attrributes?: PricingAttribute [];
}

export interface PricingAttribute {
    key: string;
    value: Object;
}
