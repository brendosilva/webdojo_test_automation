/// <reference types="cypress" />

describe("Simulando mouse over", () => {
  it("Deve mostrar um texto ao passar um mouse em cima do link do instagram", () => {
    cy.start();
    cy.sendLogin("papito@webdojo.com", Cypress.env("senha"));

    cy.get('[data-cy="instagram-link"]').realHover();
    cy.contains("Isso é Mouseover!").should("exist");
  });
});
