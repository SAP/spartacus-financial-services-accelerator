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

export function checkMiniCart() {
  const miniCartContent: addOptionsPage.MiniCart = {
    price: ' €503,125.00 ',
    products: [
      {
        title: ' Term Amount: ',
        value: ' 500000 ',
      },
      {
        title: 'Deposit Term:',
        value: ' 3 ',
      },
      {
        title: 'Maturity Option:',
        value: ' termination ',
      },
      {
        title: 'Start Date:',
        value: ' 2021-12-12 ',

      },
    ],
  };
  shared.checkMiniCart(miniCartContent);
}
