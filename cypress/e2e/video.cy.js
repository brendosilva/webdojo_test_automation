/// <reference types="cypress" />

describe("Video", () => {
  it("Deve ser possivel tocar video", () => {
    cy.start();
    cy.sendLogin("papito@webdojo.com", Cypress.env("senha"));
    cy.contains("Video").click();
    cy.get("iframe[title='Video Player'")
      .should("exist")
      .its("0.contentDocument.body")
      .then(cy.wrap)
      .as("iframePlayer");

    cy.get("@iframePlayer").find(".play-button").click();
    cy.get("@iframePlayer").find(".pause-button").should("be.visible");
  });
});
