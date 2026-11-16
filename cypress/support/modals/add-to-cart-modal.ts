export class AddToCartModal {
  private readonly selector = '[data-cy="add-to-cart-modal"]';

  private verifyVisibleFor(coffeeName: string): void {
    cy.get(this.selector)
      .should("be.visible")
      .and("contain.text", `Add ${coffeeName} to the cart?`);
  }

  accept(coffeeName: string): void {
    this.verifyVisibleFor(coffeeName);

    cy.get(this.selector).contains("button", "Yes").click();
    cy.get(this.selector).should("not.be.visible");
  }

  decline(coffeeName: string): void {
    this.verifyVisibleFor(coffeeName);

    cy.get(this.selector).contains("button", "No").click();
    cy.get(this.selector).should("not.be.visible");
  }
}
