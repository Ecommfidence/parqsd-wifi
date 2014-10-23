angular.module('index')
.controller('indexCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
	$scope.fname = "";
	$scope.lname = "";
	$scope.errorInEmail = true;

	$scope.$watch('email', function (newVal, oldVal){
		$scope.errorInEmail = newVal && newVal.length > 0 && !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(newVal);
	});

	$scope.fetch = function (){
		if($scope.fname && $scope.fname.length > 0 && $scope.lname && $scope.lname.length > 0 && newVal && newVal.length > 0 && !$scope.errorInEmail)
			(function crossDomainPost() {
			  // Add the iframe with a unique name
			  var iframe = document.createElement("iframe");
		  	var uniqueString = '398df374-325d-4bc9-b750-a54e57e0ab44';//"CHANGE_THIS_TO_SOME_UNIQUE_STRING";
		  	document.body.appendChild(iframe);
		  	iframe.style.display = "none";
		  	iframe.contentWindow.name = uniqueString;

		  	// construct a form with hidden inputs, targeting the iframe
		  	var form = document.createElement("form");
		  	form.target = uniqueString;
		  	form.action = '//parqsd.us8.list-manage.com/subscribe/post?u=ad0cc5107731b466cd161f702&amp;id=738d9979d0';
		  	form.method = 'POST';

		  	// repeat for each parameter
		  	var input = document.createElement("input");
		  	input.type = "hidden";
		  	input.name = 'EMAIL';
		  	input.value = $scope.email;
		  	form.appendChild(input);

		  	document.body.appendChild(form);
		  	form.submit();
		  	document.body.removeChild(form);
		  })();
		};
	}]);