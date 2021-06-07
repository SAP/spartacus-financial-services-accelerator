export const b2b = {
  b2b: {
    selectProducts: 'Select Products',
    activeProducts: 'Active Products',
    notAssigned: 'Not Assigned',
  },
};

export const organization = {
  organization: {
    productActivation: 'Product Activation',
    productAssignment: 'Product Assignment',
  },
  orgUnit: {
    header: 'All organization ({{count}})',
    unit: 'Organization',
    parentUnit: 'Parent Organization',
    details: {
      title: 'Organization Details',
      subtitle: 'Organization: {{ item.name }}',
    },
    edit: {
      title: 'Edit Organization',
      subtitle: 'Organization: {{ item.name }}',
    },
    create: {
      title: 'Create Organization',
      subtitle: '',
    },
    messages: {
      deactivate: 'Are you sure you want to disable this organization?',
      confirmEnabled: 'Organization {{item.name}} enabled successfully',
      confirmDisabled: 'Organization {{item.name}} disabled successfully',
      update: 'Organization {{ item.name }} updated successfully',
      create: 'Organization {{ item.name }} created successfully',
    },
    links: {
      units: 'Child Organization',
    },
    children: {
      create: {
        title: 'Create child Organization',
        subtitle: '',
      },
      messages: {
        create: 'Organization {{ item.name }} created successfully',
      },
    },
    form: {
      parentOrgUnit: 'Parent business organization',
      create: 'Create Organization',
    },
    assignApprovers: {
      instructions: {
        check: `To assign an approver to this organization, select the user's check box.`,
      },
    },
    breadcrumbs: {
      list: 'All organization',
      children: 'Child organization',
      productAssignment: 'Product Assignment',
    },
  },
  orgUnitChildren: {
    title: 'Child organization',
    subtitle: 'Organization: {{item.name}}',
  },
  orgUnitApprovers: {
    subtitle: 'Organization: {{item.name}}',
  },
  orgUnitAssignedApprovers: {
    subtitle: 'Organization: {{item.name}}',
  },
  orgUnitAssignedUsers: {
    subtitle: 'Organization: {{item.name}}',
  },
  orgUnitUsers: {
    subtitle: 'Organization: {{item.name}}',
  },
};
export const productAssignments = {
  productAssignments: {
    title: 'Product Assignments',
    subtitle: 'Products already assigned to the organization.',
    assign: 'Assign',
    remove: 'Remove',
    add: 'Add',
    deassigned: 'Product {{ item.name }} unassigned successfully',
  },
};

export const potentialProductAssignments = {
  potentialProductAssignments: {
    title: 'Potential Products',
    subtitle: 'Products which can be assigned to the organization.',
    assigned: 'Product {{ item.name }} assigned successfully',
  },
};
