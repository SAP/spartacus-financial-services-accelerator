import { ProductOverviewCategory } from '../../occ';

export const productOverviewFilters = [
  {
    text: 'all',
    emits: ProductOverviewCategory.ALL,
    activeStatus: true,
  },
  {
    text: 'insurances',
    emits: ProductOverviewCategory.INSURANCE,
    activeStatus: false,
  },
  {
    text: 'banking',
    emits: ProductOverviewCategory.BANKING,
    activeStatus: false,
  },
];
