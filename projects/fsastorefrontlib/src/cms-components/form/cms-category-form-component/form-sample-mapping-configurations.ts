import { CategoryFormRelation } from '@fsa/dynamicforms';

export const categoryFormRelations: CategoryFormRelation[] = [
  {
    categoryCode: 'insurances_travel',
    chooseCoverFormId: 'trip_details_form',
  },
  {
    categoryCode: 'insurances_auto',
    chooseCoverFormId: 'auto_details_form',
  },
  {
    categoryCode: 'insurances_life',
    chooseCoverFormId: 'life_details_form',
  },
  {
    categoryCode: 'insurances_event',
  },
];
