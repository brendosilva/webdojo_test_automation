/// <reference types="cypress" />

describe("Login", () => {
  it("Deve logar com sucesso", () => {
    cy.start();
    cy.sendLogin("papito@webdojo.com", Cypress.env("senha"));

    cy.get('[data-cy="user-name"]')
      .should("be.visible")
      .and("have.text", "Fernando Papito");

    cy.get('[data-cy="welcome-message"]')
      .should("be.visible")
      .and(
        "have.text",
        "Olá QA, esse é o seu Dojo para aprender Automação de Testes.",
      );
  });

  it("Não deve logar com senha invalida", () => {
    cy.start();
    cy.sendLogin("papito@webdojo.com", "12345678");

    cy.contains("Acesso negado! Tente novamente.").should("be.visible");
  });

  it("Não deve logar com email invalida", () => {
    cy.start();
    cy.sendLogin("papito404@webdojo.com", Cypress.env("senha"));

    cy.contains("Acesso negado! Tente novamente.").should("be.visible");
  });
});
