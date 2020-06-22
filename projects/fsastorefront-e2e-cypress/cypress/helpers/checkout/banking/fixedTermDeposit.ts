import * as shared from "../shared-checkout";

export function checkOptionalProducts() {
  const addOptionsContent: addOptionsPage.AddOptions = {
    title: 'Your Fixed Term Deposit Application',
    items: [
      {
        name: 'Flexi Deposit',
        available: true,
        shouldAdd: true,
      },
      {
        name: 'Offset Account',
        available: true,
        shouldAdd: true,
      },
    ],
  };
  shared.checkAddOptionsPageContent(addOptionsContent);
}
