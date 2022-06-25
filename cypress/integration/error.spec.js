/// <reference types="cypress" />

// Welcome to Cypress!

// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

before(() => {
  // Cypress starts out with a blank slate for each test
  // so we must tell it to visit our website with the `cy.visit()` command.
  // Since we want to visit the same URL at the start of all our tests,
  // we include it in our beforeEach function so that it runs before each test

  cy.intercept(
    "GET",
    "https://api.nasa.gov/neo/rest/v1/feed?start_date=*&end_date=*&api_key=*",
    {
      statusCode: 500,
    }
  ).as("api-error");
});

beforeEach(() => {
  cy.visit("http://localhost:3000/index.html");
});

describe("The Nasa Asteroids App", () => {
  describe("Given a network error occurs", () => {
    it("renders the correct text", () => {
      cy.waitFor("@api-error");
      cy.get('[data-cy="error-container"]').should("have.text", "network error");
    });
  });
});
