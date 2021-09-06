describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticketbox-backstopjs-tat.s3.eu-central-1.amazonaws.com/index.html"))

    it("fills all the text input fields", () => {
        const customer = {
            firstName: "Vinicyus", 
            lastName: "Marques",
            email: "vinicyus@example.com"
        };

        const fullName = `${customer.firstName} ${customer.lastName}`;

        cy.fillMandatoryFields(customer);

        cy.get("#requests").type("Teste");
        cy.get("#signature").type(`${fullName}`);
    })

    it("select two tickets", () => {
        cy.get("#ticket-quantity").select("2");
    })

    it("select VIP ticket type", () => {
        cy.get("#vip").check();
    })

    it("select 'social media' checkbox", () => {
        cy.get("#social-media").check();
    })

    it("select 'Friend' and 'Publication' checkbox, then uncheck 'Friend'" , () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    })

    it("has 'TICKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX");
    })

    it("Alerts on invalid e-mail", () => {
        cy.get("#email")
        .as("email")
        .type("vinicyus-marques-gmail.com");

        cy.get("#email.invalid")
        .should("exist");

        cy.get("@email")
        .clear()
        .type("vinicyus-marques@gmail.com");

        cy.get("#email.invalid")
        .should("not.exist");
    })

    it("Fills and reset form", () => {

        const customer = {
            firstName: "Vinicyus", 
            lastName: "Marques",
            email: "vinicyus@example.com"
        };

        const fullName = `${customer.firstName} ${customer.lastName}`;

        cy.fillMandatoryFields(customer);
    

        cy.get("#ticket-quantity").select("2");
        cy.get("#friend").check();
        cy.get("#vip").check();
        cy.get("#requests").type("Teste");

        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets`
            );

        cy.get("#signature").type(fullName);

        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");

        cy.get("button[type='reset']").click();
        cy.get("@submitButton").should("be.disabled");
    })

    it("Fills mandatory fields using support command", () => {
        const customer = {
            firstName: "Vinicyus", 
            lastName: "Marques",
            email: "vinicyus@example.com"
        };

        cy.fillMandatoryFields(customer);

        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");

        cy.get("button[type='reset']")
        .click();

        cy.get("@submitButton")
        .should("be.disabled");
    })
})