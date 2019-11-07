// models should be moved to fsastorefrontlib once the form data is posted to backend
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
}
