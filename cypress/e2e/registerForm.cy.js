describe("Register Form", () => {
  it("Should validate the form without errors", () => {
    cy.intercept("POST", "/register", { statusCode: 200 });
    cy.visit("http://localhost:3000");
    cy.get("input[name='username']").type("Sarab");
    cy.get("input[name='country']").type("India");
    cy.get("li").contains("India").click();
    cy.get("input[name='tax']").type("DVDPS5219L");
    cy.get("#submitButton").click();
    cy.get(".errorMessage").should("not.exist");
    cy.contains("User is registered Successfully!");
  });
  it("Should show error if API fails", () => {
    cy.intercept("POST", "/register", { statusCode: 400 });
    cy.visit("http://localhost:3000");
    cy.get("input[name='username']").type("Sarab");
    cy.get("input[name='country']").type("India");
    cy.get("li").contains("India").click();
    cy.get("input[name='tax']").type("DVDPS5219L");
    cy.get("#submitButton").click();
    cy.get(".errorMessage").should("not.exist");
    cy.contains("Error in submitting the form");
  });
  describe("Username field", () => {
    it("Should show error if username not filled", () => {
      cy.visit("http://localhost:3000");
      cy.get("button").click();
      cy.contains("Username is required").should("be.visible");
    });
    it("Should show error if username is less than 2 characters", () => {
      cy.visit("http://localhost:3000");
      cy.get("input[name='username']").type("Sa");
      cy.get("button").click();
      cy.contains("This field should be at least 3 characters long").should(
        "be.visible"
      );
    });
  });
  describe("Country field", () => {
    it("Should show error if country not filled", () => {
      cy.visit("http://localhost:3000");
      cy.get("button").click();
      cy.contains("Country is required.").should("be.visible");
    });
    it("Should show error if valid country not selected", () => {
      cy.visit("http://localhost:3000");
      cy.get("input[name='country']").type("Test");
      cy.get("body").click();
      cy.get("#submitButton").click();
      cy.contains("Select a valid country").should("be.visible");
    });
  });
  describe("TAX field", () => {
    it("Should show error if Tax not filled", () => {
      cy.visit("http://localhost:3000");
      cy.get("button").click();
      cy.contains("Tax is required.").should("be.visible");
    });
    it("Should show error if tax field is invalid", () => {
      cy.visit("http://localhost:3000");
      cy.get("input[name='tax']").type("Sa");
      cy.get("body").click();
      cy.get("#submitButton").click();
      cy.contains("Tax number is not validated.").should("be.visible");
    });
  });
});
