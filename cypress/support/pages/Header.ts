export class Header {
  private readonly cartCounter = 'a[aria-label="Cart page"]';

  verifyCartCounter(expectedCount: number): void {
    cy.get(this.cartCounter)
      .should("be.visible")
      .and("contain.text", `(${expectedCount})`);
  }
}
