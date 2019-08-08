import { ShoppingCart, Cart } from "./checkout";
import {
  ItemPrices,
  NoDiscountPricing,
  SpecialPriceDiscounts,
  SpecialPriceStrategy
} from "./pricingStrategies";

const prices: ItemPrices = {
  A: 50,
  B: 30,
  C: 20,
  D: 15
};

const discounts: SpecialPriceDiscounts = {
  A: {
    quantity: 3,
    price: 130
  },
  B: {
    quantity: 2,
    price: 45
  }
};

describe("NoDiscountPricingStragergy", () => {
  it("should return 50 for A of quantity 1", () => {
    const pricingStrategy = new NoDiscountPricing(prices);

    expect(pricingStrategy.getPrice("A", 1)).toBe(50);
  });
});

describe("checkoutKata - No Discount", () => {
  let cart: ShoppingCart;
  const pricingStrategy = new NoDiscountPricing(prices);

  beforeEach(() => {
    cart = new ShoppingCart(pricingStrategy);
  });

  it.each`
    items     | price
    ${""}     | ${0}
    ${"A"}    | ${50}
    ${"AB"}   | ${80}
    ${"CDBA"} | ${115}
  `("should return $price with $items", ({ items, price }) => {
    cart.scanMultiple(items);

    expect(cart.getCartTotal()).toBe(price);
  });
});

describe("checkoutKata - SinglePrice Discount", () => {
  let cart: ShoppingCart;
  const pricingStrategy = new SpecialPriceStrategy(prices, discounts);

  beforeEach(() => {
    cart = new ShoppingCart(pricingStrategy);
  });

  it.each`
    items       | price
    ${"AA"}     | ${100}
    ${"AAA"}    | ${130}
    ${"AAAA"}   | ${180}
    ${"AAAAA"}  | ${230}
    ${"AAAAAA"} | ${260}
    ${"AAAB"}   | ${160}
    ${"AAABB"}  | ${175}
    ${"AAABBD"} | ${190}
    ${"DABABA"} | ${190}
  `("should return $price with $items", ({ items, price }) => {
    cart.scanMultiple(items);

    expect(cart.getCartTotal()).toBe(price);
  });
});

describe("checkoutKata - Incremental", () => {
  it("should calculate total incrementally", () => {
    const pricingStrategy = new SpecialPriceStrategy(prices, discounts);
    const cart = new ShoppingCart(pricingStrategy);

    cart.scan("A");
    expect(cart.getCartTotal()).toBe(50);
    cart.scan("B");
    expect(cart.getCartTotal()).toBe(80);
    cart.scan("A");
    expect(cart.getCartTotal()).toBe(130);
    cart.scan("A");
    expect(cart.getCartTotal()).toBe(160);
    cart.scan("B");
    expect(cart.getCartTotal()).toBe(175);
  });
});
