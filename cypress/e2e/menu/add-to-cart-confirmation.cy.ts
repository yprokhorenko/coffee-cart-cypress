/**
 * @testcase TC-03: Adding a coffee via right click requires confirmation
 * @issue https://github.com/yprokhorenko/coffee-cart-cypress/issues/3
 */

import { MenuPage } from "../../support/pages/MenuPage";
import { Header } from "../../support/pages/Header";

const menuPage = new MenuPage();
const header = new Header();

describe("[TC-03] Adding a coffee via right click requires confirmation", () => {
  beforeEach(() => {
    menuPage.visit();
    header.verifyCartCounter(0);
    menuPage.verifyEmptyCartState();
  });

  it("adds Mocha after confirming", () => {
    menuPage.rightClickCoffee("Mocha");
    menuPage.confirmAddToCart("Mocha");

    header.verifyCartCounter(1);
    menuPage.verifyTotal("$8.00");
  });

  it("does not add Mocha after declining", () => {
    menuPage.rightClickCoffee("Mocha");
    menuPage.declineAddToCart("Mocha");

    header.verifyCartCounter(0);
    menuPage.verifyEmptyCartState();
  });
});
