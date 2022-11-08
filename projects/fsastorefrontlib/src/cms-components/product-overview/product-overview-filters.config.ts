import { ProductOverviewCategory } from '../../occ';

export const productOverviewFilters = [
  {
    text: 'all',
    emits: ProductOverviewCategory.ALL,
    active: true,
  },
  {
    text: 'insurances',
    emits: ProductOverviewCategory.INSURANCE,
    active: false,
  },
  {
    text: 'banking',
    emits: ProductOverviewCategory.BANKING,
    active: false,
  },
];
