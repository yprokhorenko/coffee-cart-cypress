import type { Coffee } from "../../data/coffees";
import type { CartLine } from "../utils/cart";

export class MenuPage {
  private readonly coffeeCards = "ul > li:has(> h4):has([data-cy])";
  // Total button of the cart preview on the menu page.
  private readonly totalButton = 'button[data-test="checkout"]';

  visit(): void {
    cy.visit("/");
  }

  verifyEmptyCartState(): void {
    this.verifyTotal("$0.00");
  }

  verifyTotal(expectedTotal: string): void {
    cy.get(this.totalButton)
      .should("be.visible")
      .and("contain.text", expectedTotal);
  }

  verifyCoffeeVisibleWithPrice(coffee: Coffee): void {
    this.findCoffeeCard(coffee)
      .should("be.visible")
      .and("contain.text", coffee.price);
  }

  addCoffee(coffee: Coffee): void {
    this.coffeeButton(coffee).click();
  }

  rightClickCoffee(coffee: Coffee): void {
    this.coffeeButton(coffee).rightclick();
  }
  
  /** Clicks each coffee `quantity` times, e.g. espresso x2 -> two clicks. */
  addCoffees(lines: ReadonlyArray<CartLine>): void {
    lines.forEach(({ coffee, quantity }) => {
      for (let i = 0; i < quantity; i++) {
        this.addCoffee(coffee);
      }
    });
  }

  private coffeeButton(coffee: Coffee): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.findCoffeeCard(coffee).find("[data-cy]").should("be.visible");
  }

  // Exact name match: cy.contains("Espresso") would also match "Espresso Macchiato".
  private findCoffeeCard(
    coffee: Coffee,
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .get(this.coffeeCards)
      .filter((_, element) => {
        const title = Cypress.$(element)
          .find("h4")
          .first()
          .contents()
          .first()
          .text()
          .trim();

        return title === coffee.name;
      })
      .should("have.length", 1);
  }
}
