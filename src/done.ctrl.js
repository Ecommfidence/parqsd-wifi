angular.module('index')
.controller('doneCtrl', ['$scope', '$location', '$window', '$rootScope', function ($scope, $location, $window, $rootScope) {
	$scope.goOnline = function(){
		if(!$rootScope.subscribed) return $location.path('/wifi').replace();
		
		/*
		* insert script right here.
		* then erase the console.log below
		*/
		console.log('missing script');

		$window.location.href = 'http://www.parqsd.com/'
	};
}]);