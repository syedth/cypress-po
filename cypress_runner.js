const path = require('path')
const yargs = require('yargs')
const argv = yargs.options({
		browser: {
			alias: 'b',
			describe: 'choose browser that you wanna run tests on',
			default: 'chrome',
			choices: ['chrome', 'electron']
		},
		spec: {
			alias: 's',
			describe: 'run test with specific spec file',
			default: 'cypress/test_suite/**/*.spec.js',
		}
	}).help()
	.argv

// Initial environment config
const envPath = '/environment/.env.' + (process.env.NODE_ENV || argv.env);

// importing environmental variables
require('dotenv-safe')
	.config({
		path: path.join(__dirname, envPath),
		sample: path.join(__dirname, '/environment/.env.example'),
	});

const cypress = require('cypress')

const {
	merge
} = require('mochawesome-merge')
const marge = require('mochawesome-report-generator')
const rm = require('rimraf')
const cypressConfig = require('./cypress')
const ls = require('ls')

const reportDir = cypressConfig.reporterOptions.reportDir
const reportFiles = `${reportDir}/*.json`
const reportHtml = `${reportDir}/*.html`

// list all of existing report files
ls(reportFiles, {
	recurse: true
}, file => console.log(`removing ${file.full}`))

// delete all existing json report files before execution
rm(reportFiles, (error) => {
	if (error) {
		console.error(`Error while removing existing json report files: ${error}`)
		process.exit(1)
	}
	console.log('Removing all existing json report files successfully!')
})

// delete all existing Html report files
rm(reportHtml, (error) => {
	if (error) {
		console.error(`Error while removing existing Html report files: ${error}`)
		process.exit(1)
	}
	console.log('Removing all existing Html report files successfully!')
})

cypress.run({
	browser: argv.browser,
	spec: argv.spec,
	detached: false,
	defaultCommandTimeout: 3600000
}).then((results) => {
	const reporterOptions = {
		reportDir: results.config.reporterOptions.reportDir,
	}
	generateReport(reporterOptions)
}).catch((error) => {
	console.error('errors: ', error)
	process.exit(1)
})

/**
 * 
 * @param {*} options 
 */
function generateReport(options) {
	return merge(options).then((report) => {
		marge.create(report, options)
	})
}
