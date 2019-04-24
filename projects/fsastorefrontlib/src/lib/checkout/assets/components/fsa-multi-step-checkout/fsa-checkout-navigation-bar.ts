  export const checkoutNavBar = [
    {
      id: 1,
      label: 'Choose a Cover',
      status: {
        disabled: true,
        completed: false,
        active: false
      },
      progressBar: true,
      icon: 'icon-FSA-selected-item'
    },
    {
      id: 2,
      label: 'What\'s Included',
      status: {
        disabled: false,
        completed: false,
        active: true
      },
      progressBar: false,
      icon: 'icon-FSA-list'
    },
    {
      id: 3,
      label: 'Add Options',
      status: {
        disabled: true,
        completed: false,
        active: false
      },
      progressBar: false,
      icon: 'icon-FSA-shield'
    },
    {
      id: 4,
      label: 'Personal Details',
      status: {
        disabled: true,
        completed: false,
        active: false
      },
      progressBar: false,
      icon: 'icon-FSA-person'
    },
    {
        id: 5,
        label: 'Quote Review',
        status: {
          disabled: true,
          completed: false,
          active: false
        },
        progressBar: false,
        icon: 'icon-FSA-card-verify'
      },
      {
        id: 6,
        label: 'Payment Details',
        status: {
          disabled: true,
          completed: false,
          active: false
        },
        progressBar: false,
        icon: 'icon-FSA-payment-cards'
      },
      {
        id: 7,
        label: 'Final Review',
        status: {
          disabled: true,
          completed: false,
          active: false
        },
        progressBar: false,
        icon: 'icon-FSA-review'
      }
  ];

