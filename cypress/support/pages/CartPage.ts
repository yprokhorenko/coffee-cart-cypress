import type { Coffee } from "../../data/coffees";
import { formatCents, toCents } from "../utils/money";

export class CartPage {
  private readonly root = "#app > .list";
  private readonly itemRows = `${this.root} > div > ul > li.list-item`;
  private readonly totalButton = 'button[data-test="checkout"]';

  visit(): void {
    cy.visit("/cart");
    cy.location("pathname").should("eq", "/cart");
    cy.get(this.root).should("be.visible");
  }

  verifyEmptyState(): void {
    cy.get(this.root)
      .children("p")
      .should("be.visible")
      .and("have.text", "No coffee, go add some.");

    cy.get(this.root).children("ul").should("not.exist");
  }

  verifyItems(items: ReadonlyArray<Coffee>): void {
    cy.get(this.itemRows).should("have.length", items.length);

    items.forEach((coffee) => {
      this.verifyItem(coffee, 1);
    });
  }

  verifyItem(coffee: Coffee, quantity: number): void {
    const expectedSubtotal = formatCents(toCents(coffee.price) * quantity);

    this.findItemByName(coffee.name).then(($row) => {
      cy.wrap($row).should("be.visible");

      cy.wrap($row).children("div").eq(0).should("have.text", coffee.name);

      cy.wrap($row)
        .children("div")
        .eq(1)
        .find(".unit-desc")
        .should("be.visible")
        .and("have.text", `${coffee.price} x ${quantity}`);

      cy.wrap($row).children("div").eq(2).should("have.text", expectedSubtotal);
    });
  }

  private findItemByName(name: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .get(this.itemRows)
      .filter((_, element) => {
        const itemName = Cypress.$(element)
          .children("div")
          .first()
          .text()
          .trim();

        return itemName === name;
      })
      .should("have.length", 1);
  }
  verifyTotal(expectedTotal: string): void {
    cy.get(this.totalButton)
      .should("be.visible")
      .and("contain.text", expectedTotal);
  }
}
