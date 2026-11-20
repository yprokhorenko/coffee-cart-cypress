/**
 * @testcase TC-02: Adding a coffee updates the cart counter and total
 * @issue https://github.com/yprokhorenko/coffee-cart-cypress/issues/2
 */

import coffees from "../../data/coffees";
import { Header, MenuPage } from "../../support";
import { cartLine, countItems, formatTotal } from "../../support/utils/cart";

const menuPage = new MenuPage();
const header = new Header();

describe("[TC-02] Adding a coffee updates the cart counter and total", () => {
  beforeEach(() => {
    menuPage.visit();
  });

  it("adds Espresso once and updates the cart counter and total", () => {
    const lines = [cartLine(coffees.espresso)];

    menuPage.addCoffees(lines);
    header.verifyCartCounter(countItems(lines));
    menuPage.verifyTotal(formatTotal(lines));
  });

  it("adds Espresso twice and updates the cart counter and total", () => {
    const lines = [cartLine(coffees.espresso, 2)];

    menuPage.addCoffees(lines);
    header.verifyCartCounter(countItems(lines));
    menuPage.verifyTotal(formatTotal(lines));
  });

  it("adds Espresso and Mocha and updates the cart counter and total", () => {
    const lines = [cartLine(coffees.espresso), cartLine(coffees.mocha)];

    menuPage.addCoffees(lines);
    header.verifyCartCounter(countItems(lines));
    menuPage.verifyTotal(formatTotal(lines));
  });
});
