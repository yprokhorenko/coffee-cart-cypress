import type { Coffee } from "../../data/coffees";
import { formatCents, toCents } from "../utils/money";

/** One expected cart entry: a catalog coffee and how many times it was added. */
export type CartLine = { coffee: Coffee; quantity: number };

/**
 * One cart row as rendered in the DOM, as plain trimmed text.
 * Shared shape for "expected" and "actual", so one deep-equality assertion fits.
 */
type RenderedLine = { name: string; unitDesc: string; subtotal: string };

// Work in cents (integers) to avoid floating-point errors.
const subtotalCents = ({ coffee, quantity }: CartLine): number =>
  toCents(coffee.price) * quantity;

export class CartPage {
  private readonly root = "#app > .list";
  // Field initializers run top to bottom, so `root` must stay above this line.
  private readonly itemRows = `${this.root} > div > ul > li.list-item`;
  // Order total of the cart page (not the menu page's cart preview).
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
  /** Derives the expected total from the lines and checks the total button. */
  verifyTotalFor(lines: ReadonlyArray<CartLine>): void {
    const cents = lines.reduce((sum, line) => sum + subtotalCents(line), 0);

    cy.get(this.totalButton)
      .should("be.visible")
      .and("contain.text", formatCents(cents));
  }

  // Row layout: [name | "<price> x <qty>" | subtotal].
  // Cypress.$ is used because cy.* commands are not allowed inside .should().
  private readRow(row: HTMLElement): RenderedLine {
    const cells = Cypress.$(row).children("div");

    return {
      name: cells.eq(0).text().trim(),
      unitDesc: cells.eq(1).find(".unit-desc").text().trim(),
      subtotal: cells.eq(2).text().trim(),
    };
  }
}
