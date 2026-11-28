import { formatTotal, subtotalCents, type CartLine } from "../utils/cart";
import { formatCents } from "../utils/money";
import type { Coffee } from "../../data/coffees";

//One cart row as rendered in the DOM, as plain trimmed text.
type RenderedLine = { name: string; unitDesc: string; subtotal: string };

export class CartPage {
  private readonly root = "#app > .list";
  // Field initializers run top to bottom, so `root` must stay above this line.
  private readonly itemRows = `${this.root} > div > ul > li.list-item`;

  // Order total of the cart page (not the menu page's cart preview).
  private readonly totalButton = 'button[data-test="checkout"]';

  // Buttons inside a cart row
  private readonly plusButton = 'button[aria-label^="Add one"]';
  private readonly minusButton = 'button[aria-label^="Remove one"]';
  // Delete (x) removes every unit of the item at once.
  private readonly removeAllButton = 'button[aria-label^="Remove all"]';

  visit(): void {
    cy.visit("/cart");
    cy.location("pathname").should("eq", "/cart");
    cy.get(this.root).should("be.visible");
  }

  increase(coffee: Coffee): void {
    this.findRow(coffee).find(this.plusButton).click();
  }

  decrease(coffee: Coffee): void {
    this.findRow(coffee).find(this.minusButton).click();
  }

  /** Removes the whole row with all its units. */
  remove(coffee: Coffee): void {
    this.findRow(coffee).find(this.removeAllButton).click();
  }

  verifyEmptyState(): void {
    cy.get(this.root)
      .children("p")
      .should("be.visible")
      .and("have.text", "No coffee, go add some.");

    // `not.exist` retries until the list is gone, so it also covers late rendering.
    cy.get(this.root).children("ul").should("not.exist");
  }

  /** Checks all cart rows in one retryable assertion; order is ignored. */
  verifyLines(lines: ReadonlyArray<CartLine>): void {
    // Expected rows in the same text format the UI renders.
    const expected: RenderedLine[] = lines.map((line) => ({
      name: line.coffee.name,
      unitDesc: `${line.coffee.price} x ${line.quantity}`,
      subtotal: formatCents(subtotalCents(line)),
    }));

    // .should(callback) is re-run until it passes or times out.
    cy.get(this.itemRows).should(($rows) => {
      const rows = $rows.toArray();

      const hidden = rows.filter((row) => !Cypress.dom.isVisible(row));
      expect(hidden, "hidden cart rows").to.have.length(0);

      // Same elements and same length, order is ignored.
      expect(rows.map((row) => this.readRow(row))).to.have.deep.members(
        expected,
      );
    });
  }

  /** Derives the expected total from the lines and checks the total button. */
  verifyTotalFor(lines: ReadonlyArray<CartLine>): void {
    cy.get(this.totalButton)
      .should("be.visible")
      .and("contain.text", formatTotal(lines));
  }

  // Exact name match, so "Espresso" never selects "Espresso Macchiato".
  private findRow(coffee: Coffee): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .get(this.itemRows)
      .filter((_, row) => this.cellsOf(row).eq(0).text().trim() === coffee.name)
      .should("have.length", 1);
  }

  // Row layout: [name | "<price> x <qty>" | subtotal].
  // Cypress.$ is used because cy.* commands are not allowed inside .should().
  private cellsOf(row: HTMLElement) {
    return Cypress.$(row).children("div");
  }

  // Row layout: [name | "<price> x <qty>" | subtotal].
  private readRow(row: HTMLElement): RenderedLine {
    const cells = Cypress.$(row).children("div");

    return {
      name: cells.eq(0).text().trim(),
      unitDesc: cells.eq(1).find(".unit-desc").text().trim(),
      subtotal: cells.eq(2).text().trim(),
    };
  }
}
