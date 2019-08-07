export interface ItemPrices {
  [id: string]: number;
}

export interface SingleItemPricingStrategy {
  getPrice(itemId: string, quantity: number): number;
}

export class NoDiscountPricing implements SingleItemPricingStrategy {
  prices: ItemPrices;

  constructor(prices: ItemPrices) {
    this.prices = prices;
  }

  getPrice = (itemId: string, quantity: number) => {
    return this.prices[itemId] * quantity;
  };
}

export interface SingleItemDiscounts {
  [itemId: string]: {
    quantity: number;
    price: number;
  };
}

export class SpecialPrice implements SingleItemPricingStrategy {
  prices: ItemPrices;
  discounts: SingleItemDiscounts;

  constructor(prices: ItemPrices, discounts: SingleItemDiscounts) {
    this.prices = prices;
    this.discounts = discounts;
  }

  getPrice = (itemId: string, quantity: number) => {
    const discountDetails = this.discounts[itemId];

    if (!discountDetails) return this.prices[itemId] * quantity;

    const discountedItemsCount = Math.floor(
      quantity / discountDetails.quantity
    );

    const fullPriceItems = quantity % discountDetails.quantity;

    return (
      discountedItemsCount * discountDetails.price +
      fullPriceItems * this.prices[itemId]
    );
  };
}
