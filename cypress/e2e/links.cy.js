/// <reference types="cypress" />

describe("Link abrindo novas abas/janela", () => {
  it("Validando o atributo do link do instagram", () => {
    cy.start();
    cy.sendLogin("papito@webdojo.com", Cypress.env("senha"));
    cy.get('[data-cy="instagram-link"]')
      .should("have.attr", "href", "https://www.instagram.com/qapapito")
      .and("have.attr", "target", "_blank");
  });

  it.only("Acessa link de termos de uso removendo target blank", () => {
    cy.start();
    cy.sendLogin("papito@webdojo.com", Cypress.env("senha"));

    cy.contains("Formulários").click();
    cy.contains("a", "termos de uso").invoke("removeAttr", "target").click();

    cy.contains(
      "p",
      "Ao acessar e usar nossos serviços, você concorda em reunir estes termos de uso. Se você não concordar com algo aspecto desses termos, não utilize nossos serviços.",
    ).should("be.visible");
  });
});
