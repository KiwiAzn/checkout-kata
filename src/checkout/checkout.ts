import { SingleItemPricingStratergy } from "./pricingStratergies";

export interface Cart {
  items: Items;
  singleItemPricingStragery: SingleItemPricingStratergy;
  scan(id: string): void;
  getCartTotal(): number;
}

interface Items {
  [id: string]: number;
}

export class ShoppingCart implements Cart {
  singleItemPricingStragery: SingleItemPricingStratergy;
  items: Items;

  constructor(singleItemPricingStragery: SingleItemPricingStratergy) {
    this.singleItemPricingStragery = singleItemPricingStragery;
    this.items = {};
  }

  scanMultiple = (ids: string) => {
    ids.split("").forEach(id => this.scan(id));
  };

  scan = (id: string) => {
    this.items[id] = (this.items[id] || 0) + 1;
  };

  getCartTotal = () => {
    return Object.entries(this.items).reduce((prev, current) => {
      const itemId = current[0];
      const itemCount = current[1];
      return prev + this.singleItemPricingStragery.getPrice(itemId, itemCount);
    }, 0);
  };
}
