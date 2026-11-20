import type { Coffee } from "../../data/coffees";

export class AddToCartModal {
  private readonly selector = '[data-cy="add-to-cart-modal"]';

  accept(coffee: Coffee): void {
    this.answer(coffee, "Yes");
  }

  decline(coffee: Coffee): void {
    this.answer(coffee, "No");
  }

  private answer(coffee: Coffee, button: "Yes" | "No"): void {
    cy.get(this.selector)
      .should("be.visible")
      .and("contain.text", `Add ${coffee.name} to the cart?`);

    cy.get(this.selector).contains("button", button).click();
    cy.get(this.selector).should("not.be.visible");
  }
}
