import { CategoryFormRelationMapping } from '@fsa/dynamicforms';

export const categoryFormRelationMappings: CategoryFormRelationMapping[] = [
  {
    categoryCode: 'insurances_travel',
    chooseCoverFormId: 'trip_details_form',
    personalDetailsFormId: 'travel_personal_details',
  },
  {
    categoryCode: 'insurances_auto',
    chooseCoverFormId: 'auto_details_form',
    personalDetailsFormId: 'insurance_personal_details',
  },
  {
    categoryCode: 'insurances_life',
    chooseCoverFormId: 'life_details_form',
    personalDetailsFormId: 'insurance_personal_details',
  },
  {
    categoryCode: 'insurances_event',
    personalDetailsFormId: 'event_personal_details',
  },
];
