## The story so far

This is my attempt at the [checkout kata](http://codekata.com/kata/kata09-back-to-the-checkout/).

I have previously attempt this kata a month ago. I took a fairly naive approach which resulted in a solution that worked but was not extenisble.

This is highlighted by the kata's objective of:

> it’s a stealth exercise in decoupling.

I gave it another go after getting some feedback and pointers from my mentor.

Unfortunately while doing this I forgot to commit on a regular basis, so you'll just have to take my word for how I got to my solution.

## Approach

I initally started a project using [Create React App](https://github.com/facebook/create-react-app) because I didn't want to mess around with setting up Typescript, Jest and everything else that I may of forgotten. I understand it's pretty bloated for something as simple as this kata but I wanted to focus on the kata itself rather than wrangling compilers/transpilers.

In saying that you'll have access to all the standard `Create React App` scripts.

### I have a hammer and everything is nail

My mentor suggested that I checkout (haha) the strategy pattern. The strategy pattern is a really good fit for this particular kata. We can use the special price rule as a stratergy that our shopping cart will use to calculate the total price.

While creating my solution I created a no discount pricing strategy first, which just returns the quanity multipled by the price. This is used for the first couple of tests which require no special price. This allowed me to focus on the design of the classes and interfaces.

I did my best to decouple everything. The `Cart` interface has items, the pricing strategy, a scan method and get total price method. The `ShoppingCart` class implements this interface and also has a scan multiple items method. I decided that the `Cart` should not know about how items are priced as it's only concerns are what items it has and what the total is.

I decided that the pricing strategy classes should contain the prices for the items. This allows for greater flexibility for pricing items as you could have different base prices for different strategies. The `NoDiscountStrategy` and `SpecialPriceStrategy` both implement the `SingleItemPricingStrategy` interface. This interface only contains a get price method.

The `SpecialPriceStrategy` also contains the special price discounts. This is represented by the `SpecialPriceDiscount` interface which has a quantity and the discounted price.

Item's are simply represented by a letter as specified by the kata's description. Ideally these would be represented by an interface which would contains the product's SKU. However the single letter representation is fine for this kata.

### Now what?

While this implementation passes all the tests outlined in the kata description, there are still areas of improvment. One example would be to introduce more pricing strategies such as a xx% off the price.

A more complex example would be a combo pricing strategy where you buy some combonation of items together to get a lower price. This would mean introducing a `GroupPricngStrategy` interface to handle a such a case.

It could be interesting to implement a way that allows for multiple strategies to work together to get the lowest price. Though this is bordering dynamic programming and the strategy pattern may no longer be the correct for it.

Since I have all these React dependencies it could be fun to create a simple frontend to create a checkout app.

It would also worth investigating how I could better represent the items.
