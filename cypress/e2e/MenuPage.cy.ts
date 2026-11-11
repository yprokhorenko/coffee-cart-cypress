/**
 * @testcase TC-01: Menu shows every catalog coffee with its price
 * @issue https://github.com/yprokhorenko/coffee-cart-cypress/issues/1
 */

import { MenuPage } from "../support/pages/MenuPage";
import { Header } from "../support/pages/Header";
import coffees from "../data/coffees";

const menuPage = new MenuPage();
const header = new Header();

describe("[TC-01] Menu shows every catalog coffee with its price", () => {
  beforeEach(() => {
    menuPage.visit();
  });

  it("GH-1: should show empty cart state ($0.00 and cart counter 0)", () => {
    menuPage.verifyEmptyCartState();
    header.verifyCartCounter("cart (0)");
  });

  coffees.forEach((coffee) => {
    it(`GH-1: should display "${coffee.name}" with price ${coffee.price}`, () => {
      menuPage.verifyCoffeeVisibleWithPrice(coffee.name, coffee.price);
    });
  });
});
