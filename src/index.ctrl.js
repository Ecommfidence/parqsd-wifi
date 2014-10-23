angular.module('index')
.controller('indexCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
	$scope.fname = "";
	$scope.lname = "";
	$scope.errorInEmail = true;

	$scope.$watch('email', function (newVal, oldVal){
		console.log(arguments);
		$scope.errorInEmail = newVal && newVal.length > 0 && !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(newVal);
		console.log('hola')
	});

	$scope.fetch = function (){
		if()
		$http.post('//parqsd.us8.list-manage.com/subscribe/post?u=ad0cc5107731b466cd161f702&amp;id=738d9979d0', {
			FNAME:$scope.fname
			,LNAME:$scope.lname
			,EMAIL:$scope.email
			,'b_ad0cc5107731b466cd161f702_738d9979d0':''
			,subscribe:'Subscribe'
		})
		.success(function onSuccess(data, status, headers, config){
			$scope.results = response.data.results;
		})
		.error(function onError(data, status, headers, config){
			console.log('adios');
		});
	};
}]);