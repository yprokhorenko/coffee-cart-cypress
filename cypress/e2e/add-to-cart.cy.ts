/**
 * @testcase TC-02: Adding a coffee updates the cart counter and total
 * @issue https://github.com/yprokhorenko/coffee-cart-cypress/issues/2
 */

import { MenuPage } from "../support/pages/MenuPage";
import { Header } from "../support/pages/Header";

const menuPage = new MenuPage();
const header = new Header();

describe("[TC-02] Adding a coffee updates the cart counter and total", () => {
  beforeEach(() => {
    menuPage.visit();
  });

  it("adds Espresso once and shows cart counter 1 and total $10.00", () => {
    menuPage.addCoffee("Espresso");

    header.verifyCartCounter(1);
    menuPage.verifyTotal("$10.00");
  });

  it("adds Espresso twice and shows cart counter 2 and total $20.00", () => {
    menuPage.addCoffee("Espresso");
    menuPage.addCoffee("Espresso");

    header.verifyCartCounter(2);
    menuPage.verifyTotal("$20.00");
  });

  it("adds Espresso and Mocha and shows cart counter 2 and total $18.00", () => {
    menuPage.addCoffee("Espresso");
    menuPage.addCoffee("Mocha");

    header.verifyCartCounter(2);
    menuPage.verifyTotal("$18.00");
  });
});
