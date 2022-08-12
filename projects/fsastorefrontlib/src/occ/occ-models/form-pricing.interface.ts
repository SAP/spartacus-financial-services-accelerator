export interface PricingData {
  priceAttributeGroups?: PriceAttributeGroup[];
}

export interface PriceAttributeGroup {
  name?: string;
  priceAttributes?: PricingAttribute[];
}

export interface PricingAttribute {
  key: string;
  value: Object;
  type?: string;
}
