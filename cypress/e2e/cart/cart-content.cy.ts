/**
 * @testcase TC-04: Cart page shows the empty state and order contents
 * @issue https://github.com/yprokhorenko/coffee-cart-cypress/issues/4
 */

import coffees from "../../data/coffees";
import { CartPage, Header } from "../../support";
import { cartLine } from "../../support/utils/cart";
import { openCartWith } from "../../support/flows";

const cartPage = new CartPage();
const header = new Header();

describe("[TC-04] Cart page shows the empty state and order contents", () => {
  it("shows the empty-cart message when opening /cart with no items", () => {
    cartPage.visit();

    cartPage.verifyEmptyState();
    header.verifyCartCounter(0);
  });

  it("shows each added coffee with its quantity, subtotal, and correct total", () => {
    const lines = [cartLine(coffees.espresso), cartLine(coffees.mocha)];

    // Preconditions (empty cart, counter) are covered by TC-01/TC-02,

    openCartWith(lines);

    cartPage.verifyLines(lines);
    cartPage.verifyTotalFor(lines);
  });

  it("merges repeated additions into one row with the right quantity and subtotal", () => {
    const lines = [cartLine(coffees.espresso, 2), cartLine(coffees.mocha)];

    openCartWith(lines);

    cartPage.verifyLines(lines);
    cartPage.verifyTotalFor(lines);
  });
});
