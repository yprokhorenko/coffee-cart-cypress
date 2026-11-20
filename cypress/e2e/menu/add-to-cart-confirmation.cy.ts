/**
 * @testcase TC-03: Adding a coffee via right click requires confirmation
 * @issue https://github.com/yprokhorenko/coffee-cart-cypress/issues/3
 */

import coffees from "../../data/coffees";
import { AddToCartModal, Header, MenuPage } from "../../support";
import { cartLine, formatTotal } from "../../support/utils/cart";

const menuPage = new MenuPage();
const header = new Header();
const addToCartModal = new AddToCartModal();

describe("[TC-03] Adding a coffee via right click requires confirmation", () => {
  beforeEach(() => {
    menuPage.visit();
    header.verifyCartCounter(0);
    menuPage.verifyEmptyCartState();
  });

  it("adds Mocha after confirming", () => {
    menuPage.rightClickCoffee(coffees.mocha);
    addToCartModal.accept(coffees.mocha);

    header.verifyCartCounter(1);
    menuPage.verifyTotal(formatTotal([cartLine(coffees.mocha)]));
  });

  it("does not add Mocha after declining", () => {
    menuPage.rightClickCoffee(coffees.mocha);
    addToCartModal.decline(coffees.mocha);

    header.verifyCartCounter(0);
    menuPage.verifyEmptyCartState();
  });
});
