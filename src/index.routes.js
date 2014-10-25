angular.module('index')
.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/', {
		controller:'wifiCtrl'
		,templateUrl:'wifi.html'
	})
	.when('/wifi', {
		controller:'wifiCtrl'
		,templateUrl:'wifi.html'
	})
	.when('/done', {
		controller:'doneCtrl'
		,templateUrl:'done.html'
	})
	.otherwise({ redirectTo: '/' });
}]);


(function background_image_fix(){
	function resize(){
		$('body').css('min-height', $(window).height())
	}
	resize();
	$(window).resize(resize);
})();