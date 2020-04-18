const common = require('../../../common.js');
const pageObj = require('../../../page_objects/cypress.po.json');

describe('Cypress with Page Object Model Test', function () {

	it('Navigate to Cypress Website', () => {
		cy.visit(Cypress.env('WEB_BASE_URL'));
	})

	it('Validate the features label', () => {
		cy.get(pageObj.cypress_page.features_label).should('have.text','Features');
	})

	it('Validate the How it works label', () => {
		cy.get(pageObj.cypress_page.how_it_works_label).should('have.text','How it works');
	})

	it('Validate the Dashboard label', () => {
		cy.get(pageObj.cypress_page.dash_board_label).should('have.text','Dashboard');
	})
})
