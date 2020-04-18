
export const urlJoin = require('proper-url-join');

/**
 *
 * @param {*} path returns the path of environment variable
 */
export function getUrl(path) {
	return urlJoin(Cypress.env('API_BASE_URL'), path);
}

/**
 *
 * @param {*} methodValue pass the required method type
 * @param {*} endpointUrl pass the required endpoint url
 */
export async function getApiResponseWithoutAuth(methodValue, endpointUrl) {
	cy.request({
		method: methodValue,
		url: endpointUrl,
	}).then((response) => {})
}

/**
 * @param {string} locator locates the element
 * @param {string} assert  assert the element
 * @returns {string} returns  the asserted result
 * @description asserts two text values.
 */
export function assertText(locator, assert) {
	cy.get(locator).should(($value) => {
		const text = $value.text();
		expect(text).to.eql(assert);
	})
}

/**
 *
 * @param locator pass the element to get the value
 * @returns {Cypress.Chainable<JQuery<HTMLElementTagNameMap[*]>>}
 */
export function getInputValue(locator) {
	return cy.get(locator).invoke('val').then(
		value => {
			return value;
		})
}
