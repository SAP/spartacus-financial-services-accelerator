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
    enabled: 'Active',
    disabled: 'Disabled',
    enable: 'Enable',
    disable: 'Disable',
    name: 'Name',
    code: 'Code',
    done: 'done',
    cancel: 'Cancel',
    add: 'Add',
    create: 'Create {{name}}',
    edit: 'Edit',
    save: 'Save {{name}}',
    delete: 'Delete',
    assign: 'Manage',
    active: 'Active',
    status: 'Status',
    details: 'Details',
    messages: {
      emptyList: 'The list is empty',
    },
    userRoles: {
      b2bcustomergroup: 'Customer',
      b2bapprovergroup: 'Approver',
      b2bmanagergroup: 'Manager',
      b2badmingroup: 'Admin',
    },
    breadcrumb: 'Organization',
    notification: {
      noSufficientPermissions: 'No sufficient permissions to access this page',
      notExist: 'This item does not exist',
      disabled: 'You cannot edit a disabled item',
    },
    confirmation: {
      cancel: 'CANCEL',
      confirm: 'CONFIRM',
    },
    httpHandlers: {
      conflict: {
        unit: 'Organizational unit with uid {{ code }} already exists.',
        user: 'Member with email {{ code }} already exists',
        permission: 'Approval Permission with code {{ code }} already exists.',
        unknown: 'Server validation error.',
      },
    },
  },
};

export const orgUnit = {
  orgUnit: {
    header: 'All units ({{count}})',
    unit: 'Unit',
    name: 'Name',
    uid: 'ID',
    approvalProcess: 'Approval process',
    parentUnit: 'Parent Unit',
    active: 'Status',
    details: {
      title: 'Unit Details',
      subtitle: 'Unit: {{ item.name }}',
    },
    edit: {
      title: 'Edit Unit',
      subtitle: 'Unit: {{ item.name }}',
    },
    create: {
      title: 'Create Unit',
      subtitle: '',
    },
    messages: {
      deactivate: 'Are you sure you want to disable this unit?',
      confirmEnabled: 'Unit {{item.name}} enabled successfully',
      confirmDisabled: 'Unit {{item.name}} disabled successfully',
      update: 'Unit {{ item.name }} updated successfully',
      create: 'Unit {{ item.name }} created successfully',
    },
    links: {
      units: 'Child Units',
      users: 'Members',
      approvers: 'Approvers',
      shippingAddresses: 'Shipping Addresses',
      costCenters: 'Cost Centers',
    },
    tree: {
      expandAll: 'Expand all',
      collapseAll: 'Collapse all',
    },
    children: {
      create: {
        title: 'Create child unit',
        subtitle: '',
      },
      messages: {
        create: 'Unit {{ item.name }} created successfully',
      },
    },
    costCenters: {
      create: {
        title: 'Create cost center',
        subtitle: '',
      },
    },
    form: {
      parentOrgUnit: 'Parent business unit',
      create: 'Create Unit',
    },
    users: {
      header: 'Members in {{code}}',
      changeUserRoles: 'Change user roles',
      newUser: 'New user',
    },
    assignRoles: {
      header: 'Manage roles in {{code}}',
      instructions: {
        changes: 'Changes are saved automatically.',
      },
    },
    approvers: {
      header: 'Approvers in {{code}}',
      assign: 'Manage approvers',
      new: 'New approver',
    },
    assignApprovers: {
      header: 'Manage approvers in {{code}}',
      instructions: {
        changes: 'Changes are saved automatically.',
      },
    },
    breadcrumbs: {
      productAssignment: 'Product Assignment',
      list: 'All units',
      details: '{{name}}',
      children: 'Child units',
      users: 'Members',
      approvers: 'Approvers',
      addresses: 'Shipping addresses',
      addressDetails: '{{formattedAddress}}',
      costCenters: 'Cost Centers',
    },
  },
};

export const orgCostCenter = {
  orgCostCenter: {
    title: 'Asssigned Products',
    subtitle: 'Products already assigned to the unit.',
    header: 'All cost centers ({{count}})',
    activate: 'Assign',
    deassign: 'Deassign',
  },
};

export const orgCostCenterBudgets = {
  orgCostCenterBudgets: {
    title: 'Potential Products',
    subtitle: 'Products which can be assigned to the unit.',
  },
};

export const orgUnitUsers = {
  orgUnitUsers: {
    title: 'Members',
    subtitle: 'List of unti members.',
    info: {
      disabledDisable: 'Disable',
    },
  },
};

export const orgUnitChildren = {
  orgUnitChildren: {
    title: 'Child Units',
    subtitle: 'List of child units members.',
  },
};

export const orgUnitAssignments = {
  orgUnitAssignments: {
    title: 'Product Assignments',
    assign: 'Assign',
    remove: 'Remove',
    add: 'Add',
  },
};

export const orgUser = {
  orgUser: {
    header: 'All members ({{count}})',
    disabled: '(disabled)',
    uid: 'Email',
    active: 'Status',
    name: 'Name',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    orgUnit: 'Unit',
    unit: 'Unit',
    roles: 'Roles',
    title: 'Title',
    unitApprover: `Unit approver`,
    assignApprover: 'Add the user to approvers for the unit',
    actions: '',
    byName: 'Sort by name',
    byUnit: 'Sort by unit',
    create: {
      title: 'Create Member',
      subtitle: '',
    },
    breadcrumbs: {
      list: 'All members',
      details: '{{name}}',
      userGroups: 'User groups',
      approvers: 'Approvers',
      permissions: 'Purchase limits',
    },
  },
};
