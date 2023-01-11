export const b2b = {
  b2b: {
    selectProducts: 'Produkte auswählen',
    activeProducts: 'Aktive Produkte',
    notAssigned: 'Nicht zugeordnet',
  },
};

export const organization = {
  organization: {
    productActivation: 'Produkt aktivieren',
    productAssignment: 'Produkt zuweisen',
    notification: {
      noSufficientPermissions:
        'Keine ausreichenden Berechtigungen für den Zugriff auf die aufgerufene Seite.',
    },
    userRoles: {
      sellergroup: '[DE] Seller',
    },
  },
  orgUnit: {
    header: 'Alle Organisationen ({{count}})',
    unit: 'Organisation',
    parentUnit: 'Übergeordnete Organisation',
    hint: 'Organisationen repräsentieren Abteilungen, Geschäfte, Regionen oder jede andere logische Gruppierung, die für Sie sinnvoll ist. Mitglieder haben Zugriff auf alle untergeordneten Organisationen ihrer Hauptorganisation.',
    details: {
      title: 'Organisationsdetails',
      subtitle: 'Organisation: {{ item.name }}',
      hint: 'Organisationen repräsentieren Abteilungen, Geschäfte, Regionen oder jede andere logische Gruppierung, die für Sie sinnvoll ist. Durch das Deaktivieren einer Organisation werden alle untergeordneten Organisationen der Organisation deaktiviert, einschließlich untergeordneter Organisationen und Mitglieder. Deaktivierte Organisationen können nicht bearbeitet werden.',
    },
    edit: {
      title: 'Organisation bearbeiten',
      subtitle: 'Organisation: {{ item.name }}',
    },
    create: {
      title: 'Organisation erstellen',
      subtitle: '',
    },
    messages: {
      deactivate: 'Möchten Sie die Organisation wirklich deaktivieren??',
      confirmEnabled: 'Organisation {{item.name}} erfolgreich aktiviert',
      confirmDisabled: 'Organisation {{item.name}} erfolgreich deaktiviert',
      update: 'Organisation {{ item.name }} erfolgreich aktualisiert',
      create: 'Organisation {{ item.name }} erfolgreich erstellt',
    },
    links: {
      units: 'Untergeordnete Organisation',
      users: 'Mitglieder',
    },
    children: {
      create: {
        title: 'Untergeordnete Organisation erstellen',
        subtitle: '',
      },
      messages: {
        create: 'Organisation {{ item.name }} erfolgreich erstellt',
      },
    },
    form: {
      parentOrgUnit: 'Übergeordnete Organisation',
      create: 'Organisation erstellen',
    },
    assignApprovers: {
      instructions: {
        check: `Um dieser Organisation einem Administrator zuzuweisen, aktivieren Sie das Kontrollkästchen des Benutzers.`,
      },
    },
    breadcrumbs: {
      list: 'Alle Organisationen',
      children: 'Untergeordnete Organisation',
      productAssignment: 'Produkt zuweisen',
    },
  },
  orgUnitChildren: {
    title: 'Untergeordnete Organisation',
    subtitle: 'Organisation: {{item.name}}',
    hint: 'Organisationen repräsentieren Abteilungen, Geschäfte, Regionen oder jede andere logische Gruppierung, die für Sie sinnvoll ist. Mitglieder übernehmen untergeordnete Organisationen.',
  },
  orgUnitApprovers: {
    subtitle: '[DE] Organization: {{item.name}}',
  },
  orgUnitAssignedApprovers: {
    subtitle: 'Organisation: {{item.name}}',
  },
  orgUnitAssignedUsers: {
    subtitle: 'Organisation: {{item.name}}',
  },
  orgUnitUsers: {
    title: 'Organisation: {{item.name}}',
    subtitle: 'Organisation: {{item.name}}',
    hint: 'Mitglieder sind die Käufer und Administratoren Ihrer Organisation. Jedem Mitglied wird eine Rolle für den Einkauf oder die Verwaltung der Organisation zugewiesen. Mitglieder übernehmen untergeordnete Organisationen.',
  },
  orgUser: {
    unit: 'Organisation',
    orgUnit: 'Organisation',
    assignApprover: 'Nutzer als Administrator hinzufügen',
    hint: 'Mitglieder sind die Käufer und Administratoren Ihrer Organisation. Jedem Mitglied wird eine Rolle für den Einkauf oder die Verwaltung der Organisation zugewiesen. Jedes Mitglied gehört einer Organisation an und hat Zugriff auf alle untergeordneten Organisationen seiner primären Organisation.',
    header: 'Alle Mitglieder ({{count}})',
    links: {
      password: 'Passwort ändern',
    },
    details: {
      title: 'Mitgliederdetails',
      subtitle: 'Mitglied: {{ item.name }}',
    },
    breadcrumbs: {
      list: 'alle Mitglieder',
    },
    edit: {
      title: 'Mitglied editieren',
      subtitle: 'Mitglied: {{ item.name }}',
    },
    create: {
      title: 'Mitglied erstellen',
    },
  },
};

export const productAssignments = {
  productAssignments: {
    title: 'Zuweisbare Produkte',
    subtitle: 'Produkte die der Organisation bereits zugeordnet sind.',
    assign: 'Zuordnen',
    remove: 'Entfernen',
    add: 'Hinzufügen',
    deassigned: 'Produkt {{ item.name }} erfolgreich abgewählt',
  },
};

export const potentialProductAssignments = {
  potentialProductAssignments: {
    title: 'Potentielle Produktes',
    subtitle: 'Produkte die der Organisation zugewiesen werden können.',
    assigned: 'Produkt {{ item.name }} erfolgreich zugewiesen',
  },
};
