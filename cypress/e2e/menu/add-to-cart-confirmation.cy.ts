/**
 * @testcase TC-03: Adding a coffee via right click requires confirmation
 * @issue https://github.com/yprokhorenko/coffee-cart-cypress/issues/3
 */

import { AddToCartModal, Header, MenuPage } from "../../support";

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
    menuPage.rightClickCoffee("Mocha");
    addToCartModal.accept("Mocha");

    header.verifyCartCounter(1);
    menuPage.verifyTotal("$8.00");
  });

  it("does not add Mocha after declining", () => {
    menuPage.rightClickCoffee("Mocha");
    addToCartModal.decline("Mocha");

    header.verifyCartCounter(0);
    menuPage.verifyEmptyCartState();
  });
});
