/**
 * @testcase TC-05: Cart quantity controls update totals and remove items
 * @issue https://github.com/yprokhorenko/coffee-cart-cypress/issues/5
 */

import coffees from "../../data/coffees";
import { CartPage, Header } from "../../support";
import { openCartWith } from "../../support/flows";
import { cartLine, countItems } from "../../support/utils/cart";

const cartPage = new CartPage();
const header = new Header();

// Keep every scenario at 2 cups of Espresso or fewer: the promotion appears
// at 3 cups, and it is not confirmed that "+" in the cart does not trigger it.
describe("[TC-05] Cart quantity controls update totals and remove items", () => {
  it("increases the quantity and updates subtotal and total", () => {
    openCartWith([cartLine(coffees.espresso)]);

    cartPage.increase(coffees.espresso);

    const lines = [cartLine(coffees.espresso, 2)];
    cartPage.verifyLines(lines);
    cartPage.verifyTotalFor(lines);
    header.verifyCartCounter(countItems(lines));
  });

  it("removes the item when the quantity reaches zero", () => {
    openCartWith([cartLine(coffees.espresso)]);

    // Quantity is 1, so a single press of "-" removes the item.
    cartPage.decrease(coffees.espresso);

    cartPage.verifyEmptyState();
    header.verifyCartCounter(0);
  });

  it("removes all units with the delete button", () => {
    openCartWith([cartLine(coffees.espresso, 2)]);

    cartPage.remove(coffees.espresso);

    cartPage.verifyEmptyState();
    header.verifyCartCounter(0);
  });
});
