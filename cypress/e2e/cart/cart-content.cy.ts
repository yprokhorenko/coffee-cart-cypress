/**
 * @testcase TC-04: Cart page shows the empty state and order contents
 * @issue https://github.com/yprokhorenko/coffee-cart-cypress/issues/4
 */

import coffees, { type Coffee } from "../../data/coffees";
import { CartPage, Header, MenuPage } from "../../support";
import { formatCents, toCents } from "../../support/utils/money";

function getCoffeeByName(name: string): Coffee {
  const coffee = coffees.find((item) => item.name === name);

  if (!coffee) {
    throw new Error(`Coffee "${name}" was not found in the catalog.`);
  }

  return coffee;
}

const espresso = getCoffeeByName("Espresso");
const mocha = getCoffeeByName("Mocha");

const menuPage = new MenuPage();
const cartPage = new CartPage();
const header = new Header();

describe("[TC-04] Cart page shows the empty state and order contents", () => {
  it("shows the empty-cart message when opening /cart with no items", () => {
    cartPage.visit();

    cartPage.verifyEmptyState();
    header.verifyCartCounter(0);
  });

  it("shows each added coffee with its quantity, subtotal, and correct total", () => {
    menuPage.visit();
    header.verifyCartCounter(0);
    menuPage.verifyEmptyCartState();

    menuPage.addCoffee(espresso.name);
    menuPage.addCoffee(mocha.name);

    header.verifyCartCounter(2);
    header.openCart();

    cartPage.verifyItems([espresso, mocha]);

    const expectedTotal = formatCents(
      toCents(espresso.price) + toCents(mocha.price),
    );

    cartPage.verifyTotal(expectedTotal);
  });
});
