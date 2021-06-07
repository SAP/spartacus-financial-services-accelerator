export const b2b = {
  b2b: {
    selectProducts: 'Produkte auswählen',
    activeProducts: 'Aktive Produkte',
    notAssigned: 'Nicht zugeordnet',
  },
};

export const organization = {
  organization: {
    productActivation: '[DE] Product Activation',
    productAssignment: '[DE] Product Assignment',
  },
  orgUnit: {
    header: '[DE] All organization ({{count}})',
    unit: '[DE] Organization',
    parentUnit: '[DE] Parent Organization',
    details: {
      title: '[DE] Organization Details',
      subtitle: '[DE] Organization: {{ item.name }}',
    },
    edit: {
      title: '[DE] Edit Organization',
      subtitle: '[DE] Organization: {{ item.name }}',
    },
    create: {
      title: '[DE] Create Organization',
      subtitle: '',
    },
    messages: {
      deactivate: '[DE] Are you sure you want to disable this organization?',
      confirmEnabled: '[DE] Organization {{item.name}} enabled successfully',
      confirmDisabled: '[DE] Organization {{item.name}} disabled successfully',
      update: '[DE] Organization {{ item.name }} updated successfully',
      create: '[DE] Organization {{ item.name }} created successfully',
    },
    links: {
      units: '[DE] Child Organization',
    },
    children: {
      create: {
        title: '[DE] Create child Organization',
        subtitle: '',
      },
      messages: {
        create: '[DE] Organization {{ item.name }} created successfully',
      },
    },
    form: {
      parentOrgUnit: '[DE] Parent business organization',
      create: '[DE] Create Organization',
    },
    assignApprovers: {
      instructions: {
        check: `[DE] To assign an approver to this organization, select the user's check box.`,
      },
    },
    breadcrumbs: {
      list: '[DE] All organization',
      children: '[DE] Child organization',
      productAssignment: '[DE] Product Assignment',
    },
  },
  orgUnitChildren: {
    title: '[DE] Child organization',
    subtitle: '[DE] Organization: {{item.name}}',
  },
  orgUnitApprovers: {
    subtitle: '[DE] Organization: {{item.name}}',
  },
  orgUnitAssignedApprovers: {
    subtitle: '[DE] Organization: {{item.name}}',
  },
  orgUnitAssignedUsers: {
    subtitle: '[DE] Organization: {{item.name}}',
  },
  orgUnitUsers: {
    title: '[DE] Organization: {{item.name}}',
    subtitle: '[DE] Organization: {{item.name}}',
  },
  orgUnitCostCenters: {
    subtitle: '[DE] Organization: {{item.name}}',
  },
  orgUnitAddress: {
    subtitle: '[DE] Organization: {{item.name}}',
    details: {
      subtitle: '[DE] Organization: {{item.name}} (TODO)',
    },
    edit: {
      subtitle: '[DE] Organization: {{ item.name }} (TODO)',
    },
    create: {
      subtitle: '[DE] Organization: {{ item.name }} (TODO)',
    },
  },
};

export const productAssignments = {
  productAssignments: {
    title: '[DE] Product Assignments',
    subtitle: '[DE] Products already assigned to the unit.',
    assign: '[DE] Assign',
    remove: '[DE] Remove',
    add: '[DE] Add',
    deassigned: '[DE] Product {{ item.name }} unassigned successfully',
  },
};

export const potentialProductAssignments = {
  potentialProductAssignments: {
    title: '[DE] Potential Products',
    subtitle: '[DE] Products which can be assigned to the unit.',
    assigned: '[DE] Product {{ item.name }} assigned successfully',
  },
};
