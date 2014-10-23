module.exports = function (config){
	config.set({
		basePath: './'
		,files: [ // in order
			//required dependencies
			'vendor/Angular/v1.3.0/angular.min.js'
			,'vendor/Angular/v1.3.0/angular-mocks.js'
			,'vendor/Angular/v1.3.0/angular-route.min.js'
			//src
			,'src/index.module.js'
			//specs
			,'tests/**/*.spec.js'
		//
		]
		,autoWatch: false // grunt-contrib-watch
		,frameworks: ['jasmine']
		,browsers: ['Chrome']//, 'Firefox', 'Ie']
		,plugins: [
			//karma
			'karma-chrome-launcher'
			// ,'karma-firefox-launcher'
			// ,'karma-ie-launcher'
			// ,'karma-phantomjs-launcher'
			,'karma-jasmine'
		//
		]
	});
};