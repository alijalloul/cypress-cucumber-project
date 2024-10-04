describe("Authentication Flow", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Check SignUp", () => {
    cy.get("input#fn").type("Joe");
    cy.get("input#ln").type("Doe");
    cy.get("input#email").type("la.patisserie@gmail.com");
    cy.get("input#password").type("12345");
    cy.get("input#repassword").type("12345");
    cy.get("button#signupButton").click();

    cy.get('[dataId ="signupsuccess"]').should("exist");
    cy.get('[dataId ="signupsuccess"]').should(
      "have.text",
      "Sign Up successful!"
    );
  });

  it("Check Fields Validation", () => {
    cy.get("button#signupButton").click();
    cy.get("input#fn + p").should("have.text", "First name is required");
    cy.get("input#ln + p").should("have.text", "Last name is required");
    cy.get("input#email + p").should("have.text", "Email is required");
    cy.get("input#password + p").should("have.text", "Password is required");
    cy.get("input#repassword + p").should(
      "have.text",
      "Re-password is required"
    );
  });

  it("Check password mis-match", () => {
    cy.get("input#fn").type("Joe");
    cy.get("input#ln").type("Doe");
    cy.get("input#email").type("la.patisserie@gmail.com");
    cy.get("input#password").type("12345");
    cy.get("input#repassword").type("54321");
    cy.get("button#signupButton").click();
    cy.get("input#repassword + p").should(
      "have.text",
      "Passwords do not match"
    );
  });

  it("Check LogIn and LogOut", () => {
    cy.get("button[id*='trigger-login']").click();
    cy.get("input#email").type("la.patisserie@gmail.com");
    cy.get("input#password").type("12345");
    cy.get("button#loginButton").click();
    cy.get('[dataId ="loginsuccess"]').should("exist");
    cy.get('[dataId ="loginsuccess"]').should(
      "have.text",
      "Log In successful!"
    );
    cy.getCookie("token").should("exist");

    cy.get("button#logoutButton").click();
    cy.get('[dataId ="logoutsuccess"]').should("exist");
    cy.get('[dataId ="logoutsuccess"]').should(
      "have.text",
      "Logged out successfully!"
    );
  });

  it("Check LogIn with incorrect credentials", () => {
    cy.get("button[id*='trigger-login']").click();
    cy.get("input#email").type("invalid@example.com");
    cy.get("input#password").type("wrongpassword");
    cy.get("button#loginButton").click();
    cy.get('[dataId ="loginerror"]').should("exist");
    cy.get('[dataId ="loginerror"]').should("have.text", "Invalid credentials");
  });
});
