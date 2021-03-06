describe("Register Form", () => {
  describe("Username field", () => {
    it("Should show error if username not filled", () => {
      cy.visit("http://localhost:3000");
      cy.get("input[name='username']").focus("").blur();
      cy.contains("The username field is required").should("be.visible");
    });
    it("Should show error if username is less than 2 characters", () => {
      cy.visit("http://localhost:3000");
      cy.get("input[name='username']").type("Sa").blur();
      cy.contains(
        "The username field must be atleast 3 characters long"
      ).should("be.visible");
    });
  });
  describe("Country field", () => {
    it("Should show error if country not filled", () => {
      cy.visit("http://localhost:3000");
      cy.get("input[name='country']").type("Test").clear();
      cy.contains("The country field is required").should("be.visible");
    });
    it("Should show error if valid country not selected", () => {
      cy.visit("http://localhost:3000");
      cy.get("input[name='country']").type("Test");
      cy.get("body").click();
      cy.contains("Please select a valid country.").should("be.visible");
    });
  });
  describe("TAX field", () => {
    it("Should show error if Tax not filled", () => {
      cy.visit("http://localhost:3000");
      cy.get("input[name='tax']").focus("").clear();
      cy.contains("The tax field is required").should("be.visible");
    });
    it("Should show error if tax field is invalid", () => {
      cy.visit("http://localhost:3000");
      cy.get("input[name='tax']").type("Sa").blur();
      cy.get("body").click();
      cy.contains("tax number is not valid.").should("be.visible");
    });
  });
  describe("Form Submission", () => {
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
  });
});
