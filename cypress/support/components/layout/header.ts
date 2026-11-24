export class Header {
  private readonly cartLink = 'a[aria-label="Cart page"]';

  verifyCartCounter(expectedCount: number): void {
    cy.get(this.cartLink)
      .should("be.visible")
      .and("contain.text", `(${expectedCount})`);
  }

  openCart(): void {
    cy.get(this.cartLink).should("be.visible").click();
    cy.location("pathname").should("eq", "/cart");
  }
}
