describe("Authentication Page", () => {
  it("should exists", () => {
    cy.visit("http://localhost:3000/auth");
    cy.url().should("include", "/auth");
  });

  describe("Authentication Form", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/auth");
    });

    it("should have an email input", () => {
      cy.get("input[name=email]").should("exist");
    });

    it("should change to OTP form when email is submitted", () => {
      cy.get("input[name=email]").type("alessio.marchi");
      cy.get("button[type=submit]").click();
      cy.get("input[name=code]").should("exist");
    });
  });
});

export {};
