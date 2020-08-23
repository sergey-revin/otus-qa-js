const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
	tests: './homeWork_3/homeWork3_1_test.js',
	output: './output',

	helpers: {
		Puppeteer: {
			url: 'http://localhost',
			show: true,
			windowSize: '1600x900',
			chrome: {
				args: ['--window-size=1800,1000']
			}
		}
	},

	include: {
		I: './steps_file.js',
		todomvcPageObject: './pageObjects/todomvc_pageObject.js'
		

	},

	bootstrap: null,
	mocha: {},
	name: 'otus-qa-js',

	plugins: {
		retryFailedStep: {
			enabled: true
		},
		screenshotOnFail: {
			enabled: true
		}
	}
}