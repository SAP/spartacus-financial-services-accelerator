import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccCartConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        createCart:
          'users/${userId}/carts?fields=DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),user',
        addToCart: '/users/${userId}/carts/${cartId}/fs-add-to-cart',
        startBundle: '/users/${userId}/carts/${cartId}/fs-start-bundle',
      },
    },
  },
};
