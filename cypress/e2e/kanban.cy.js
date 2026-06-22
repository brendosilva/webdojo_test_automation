/// <reference types="cypress" />

describe("kanban board", () => {
  it("Deve mover uma tarefa de Todo para done e atualizar o board", () => {
    const dataTransfer = new DataTransfer();
    cy.start();
    cy.sendLogin("papito@webdojo.com", Cypress.env("senha"));
    cy.contains("Kanban").click();

    cy.contains("div[draggable=true]", "Documentar API").trigger("dragstart", {
      dataTransfer,
    });

    cy.get(".column-done")
      .trigger("drop", { dataTransfer })
      .find("h3")
      .should("have.text", "Done (4)");

    cy.get(".column-done")
      .should("include.text", "Documentar API")
      .and("include.text", "Criar documentação da API com Swagger");
  });
});
