export class Header {
  private readonly cartCounter = 'a[aria-label="Cart page"]';
  private readonly cartLink = 'a[aria-label="Cart page"]';

  verifyCartCounter(expectedCount: number): void {
    cy.get(this.cartCounter)
      .should("be.visible")
      .and("contain.text", `(${expectedCount})`);
  }
  openCart(): void {
    cy.get(this.cartLink).should("be.visible").click();
    cy.location("pathname").should("eq", "/cart");
  }
}
