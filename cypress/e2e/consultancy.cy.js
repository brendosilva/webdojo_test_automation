describe("Formulário consultoria", () => {
  it("Deve solicitar consultoria individual", () => {
    cy.start();
    cy.sendLogin("papito@webdojo.com", Cypress.env("senha"));
    cy.goTo("Formulário", "Consultoria");

    cy.get("#name").type("Brendo Silva");
    cy.get('input[placeholder="Digite seu email"').type("papito@email.com");
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type("11 98888-7777")
      .should("have.value", "(11) 98888-7777");

    cy.get("#consultancyType").select("Individual");

    cy.contains("span", "Pessoa Física")
      .parent()
      .find("input")
      .check()
      .should("be.checked");

    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .should("be.not.checked");

    cy.contains("label", "CPF")
      .parent()
      .find("input")
      .type("636.949.140-30")
      .should("have.value", "636.949.140-30");

    const discoveryChannel = [
      "Instagram",
      "YouTube",
      "LinkedIn",
      "Indicação de Amigo",
      "Udemy",
    ];

    discoveryChannel.forEach((channel) => {
      cy.contains("label", channel)
        .find("input[type=checkbox]")
        .check()
        .should("be.checked");
    });

    cy.get("input[type=file]").selectFile("./cypress/fixtures/document.pdf", {
      force: true,
    });

    cy.get(
      'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]',
    ).type(
      "Lorem Gesso é simplesmente um texto fictício da indústria gráfica e de composição tipográfica. Lorem Ipsum tem sido o texto fictício padrão da indústria desde 1966, quando designers da Letraset e James Moseley, bibliotecário da St Bride Printing Library, pegaram uma tradução de Cícero de 1914 e a embaralharam para fazer um texto fictício para as folhas Body Type da Letraset. Ele sobreviveu não apenas a muitas décadas, mas também ao salto para a composição eletrônica, permanecendo essencialmente inalterado. Foi popularizado graças a essas planilhas e, mais recentemente, com softwares de editoração eletrônica, incluindo versões do Lorem Ipsum.",
    );

    const techs = [
      "Cypress",
      "Playwright",
      "Selenium",
      "Robot Framework",
      "RestAssured",
    ];

    techs.forEach((tech) => {
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type(tech)
        .type("{enter}");

      cy.contains("label", "Tecnologias")
        .parent()
        .contains("span", tech)
        .should("be.visible");
    });

    cy.contains("label", "termos de uso").find("input").check();

    cy.contains("button", "Enviar formulário").click();

    cy.get(".modal", { timeout: 6000 })
      .should("be.visible")
      .find(".modal-content")
      .should("be.visible")
      .should(
        "have.text",
        "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.",
      );
  });

  context("Caminho negativo", () => {
    it("Deve verificar os campos obrigatórios", () => {
      cy.start();
      cy.sendLogin("papito@webdojo.com", Cypress.env("senha"));
      cy.goTo("Formulário", "Consultoria");

      cy.contains("button", "Enviar formulário").click();
      cy.contains("label", "Nome Completo *")
        .parent()
        .find("p")
        .should("have.text", "Campo obrigatório")
        .and("be.visible")
        .and("have.class", "text-red-400")
        .and("have.css", "color", "rgb(248, 113, 113)");

      cy.contains("label", "Email *")
        .parent()
        .find("p")
        .should("have.text", "Campo obrigatório")
        .and("be.visible")
        .and("have.class", "text-red-400")
        .and("have.css", "color", "rgb(248, 113, 113)");

      cy.contains("p", "Você precisa aceitar os termos de uso")
        .should("be.visible")
        .and("have.class", "text-red-400")
        .and("have.css", "color", "rgb(248, 113, 113)");
    });
  });
});
