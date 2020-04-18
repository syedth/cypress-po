const common = require('../../../common.js');

describe('Cypress API Test', function () {

	it('Get Ditto Pokemon from the Response', () => {
		cy.request({
			method: 'GET',
			url: common.getUrl('/pokemon/ditto/'),
		}).then((response) => {
			expect(response.status).to.eq(200);
		})
	})
});
