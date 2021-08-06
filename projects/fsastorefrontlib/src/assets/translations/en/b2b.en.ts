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
    header: 'All organizations ({{count}})',
    unit: 'Organization',
    parentUnit: 'Parent Organization',
    hint:
      'Organizations represent departments, stores, regions, or any other logical grouping that makes sense to you. Members have access to all child organizations of their primary organization.',
    details: {
      title: 'Organization Details',
      subtitle: 'Organization: {{ item.name }}',
      hint:
        'Organizations represent departments, stores, regions, or any other logical grouping that makes sense to you. Disabling an organization disables all children of the organization, including child organizations and members. Disabled organizations cannot be edited.',
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
      list: 'All organizations',
      children: 'Child organization',
      productAssignment: 'Product Assignment',
    },
  },
  orgUnitChildren: {
    title: 'Child organization',
    subtitle: 'Organization: {{item.name}}',
    hint:
      'Organizations represent departments, stores, regions, or any other logical grouping that makes sense to you. Members "inherit" child organizations.',
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
    hint:
      'Members are the buyers and administrators of your organization. Each member is assigned a role for making purchases or administrating organization. Members "inherit" child organizations.',
  },
  orgUser: {
    unit: 'Organization',
    orgUnit: 'Organization',
    assignApprover: 'Add the user to approvers for the organization',
    hint:
      'Members are the buyers and administrators of your organization. Each member is assigned a role for making purchases or administrating organization. Each member belongs to an organization, and they have access to all child organizations of their primary organization.',
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
