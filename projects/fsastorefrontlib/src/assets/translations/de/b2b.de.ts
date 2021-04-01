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
    enabled: '[DE] Active',
    disabled: '[DE] Disabled',
    enable: '[DE] Enable',
    disable: '[DE] Disable',
    name: '[DE] Name',
    code: '[DE] Code',
    done: '[DE] done',
    cancel: '[DE] Cancel',
    add: '[DE] Add',
    create: '[DE] Create {{name}}',
    edit: '[DE] Edit',
    save: '[DE] Save {{name}}',
    delete: '[DE] Delete',
    assign: '[DE] Manage',
    active: '[DE] Active',
    status: '[DE] Status',
    details: '[DE] Details',
    messages: {
      emptyList: '[DE] The list is empty',
    },
    userRoles: {
      b2bcustomergroup: '[DE] Customer',
      b2bapprovergroup: '[DE] Approver',
      b2bmanagergroup: '[DE] Manager',
      b2badmingroup: '[DE] Admin',
    },
    breadcrumb: '[DE] Organization',
    notification: {
      noSufficientPermissions:
        '[DE] No sufficient permissions to access this page',
      notExist: '[DE] This item does not exist',
      disabled: '[DE] You cannot edit a disabled item',
    },
    confirmation: {
      cancel: '[DE] CANCEL',
      confirm: '[DE] CONFIRM',
    },
    httpHandlers: {
      conflict: {
        unit: '[DE] Organizational unit with uid {{ code }} already exists.',
        user: '[DE] Member with email {{ code }} already exists',
        permission:
          '[DE] Approval Permission with code {{ code }} already exists.',
        unknown: '[DE] Server validation error.',
      },
    },
  },
};

export const orgUnit = {
  orgUnit: {
    header: '[DE] All units ({{count}})',
    unit: '[DE] Unit',
    name: '[DE] Name',
    uid: '[DE] ID',
    approvalProcess: '[DE] Approval process',
    parentUnit: '[DE] Parent Unit',
    active: '[DE] Status',
    details: {
      title: '[DE] Unit Details',
      subtitle: '[DE] Unit: {{ item.name }}',
    },
    edit: {
      title: '[DE] Edit Unit',
      subtitle: '[DE] Unit: {{ item.name }}',
    },
    create: {
      title: '[DE] Create Unit',
      subtitle: '',
    },
    messages: {
      deactivate: '[DE] Are you sure you want to disable this unit?',
      confirmEnabled: '[DE] Unit {{item.name}} enabled successfully',
      confirmDisabled: '[DE] Unit {{item.name}} disabled successfully',
      update: '[DE] Unit {{ item.name }} updated successfully',
      create: '[DE] Unit {{ item.name }} created successfully',
    },
    links: {
      units: '[DE] Child Units',
      users: '[DE] Members',
      approvers: '[DE] Approvers',
      shippingAddresses: '[DE] Shipping Addresses',
      costCenters: '[DE] Cost Centers',
    },
    tree: {
      expandAll: '[DE] Expand all',
      collapseAll: '[DE] Collapse all',
    },
    children: {
      create: {
        title: '[DE] Create child unit',
        subtitle: '',
      },
      messages: {
        create: '[DE] Unit {{ item.name }} created successfully',
      },
    },
    costCenters: {
      create: {
        title: '[DE] Create cost center',
        subtitle: '',
      },
    },
    form: {
      parentOrgUnit: '[DE] Parent business unit',
      create: '[DE] Create Unit',
    },
    users: {
      header: '[DE] Members in {{code}}',
      changeUserRoles: '[DE] Change user roles',
      newUser: '[DE] New user',
    },
    assignRoles: {
      header: '[DE] Manage roles in {{code}}',
      instructions: {
        changes: '[DE] Changes are saved automatically.',
      },
    },
    approvers: {
      header: '[DE] Approvers in {{code}}',
      assign: '[DE] Manage approvers',
      new: '[DE] New approver',
    },
    assignApprovers: {
      header: '[DE] Manage approvers in {{code}}',
      instructions: {
        changes: '[DE] Changes are saved automatically.',
      },
    },
    breadcrumbs: {
      productAssignment: '[DE] Product Assignment',
      list: '[DE] All units',
      details: '[DE] {{name}}',
      children: '[DE] Child units',
      users: '[DE] Members',
      approvers: '[DE] Approvers',
      addresses: '[DE] Shipping addresses',
      addressDetails: '[DE] {{formattedAddress}}',
      costCenters: '[DE] Cost Centers',
    },
  },
};

export const orgCostCenter = {
  orgCostCenter: {
    title: '[DE] Asssigned Products',
    subtitle: '[DE] Products already assigned to the unit.',
    header: '[DE] All cost centers ({{count}})',
    activate: '[DE] Assign',
    deassign: '[DE] Deassign',
  },
};

export const orgCostCenterBudgets = {
  orgCostCenterBudgets: {
    title: '[DE] Potential Products',
    subtitle: '[DE] Products which can be assigned to the unit.',
  },
};

export const orgUnitUsers = {
  orgUnitUsers: {
    title: '[DE] Members',
    subtitle: '[DE] List of unti members.',
    info: {
      disabledDisable: '[DE] Disable',
    },
  },
};

export const orgUnitChildren = {
  orgUnitChildren: {
    title: '[DE] Child Units',
    subtitle: '[DE] List of child units members.',
  },
};

export const orgUnitAssignments = {
  orgUnitAssignments: {
    title: '[DE] Product Assignments',
    assign: '[DE] Assign',
    remove: '[DE] Remove',
    add: '[DE] Add',
  },
};

export const orgUser = {
  orgUser: {
    header: '[DE] All members ({{count}})',
    disabled: '[DE] (disabled)',
    uid: '[DE] Email',
    active: '[DE] Status',
    name: '[DE] Name',
    firstName: '[DE] First name',
    lastName: '[DE] Last name',
    email: '[DE] Email',
    orgUnit: '[DE] Unit',
    unit: '[DE] Unit',
    roles: '[DE] Roles',
    title: '[DE] Title',
    unitApprover: `Unit approver`,
    assignApprover: '[DE] Add the user to approvers for the unit',
    actions: '',
    byName: '[DE] Sort by name',
    byUnit: '[DE] Sort by unit',
    create: {
      title: '[DE] Create Member',
      subtitle: '',
    },
    breadcrumbs: {
      list: '[DE] All members',
      details: '[DE] {{name}}',
      userGroups: '[DE] User groups',
      approvers: '[DE] Approvers',
      permissions: '[DE] Purchase limits',
    },
  },
};
