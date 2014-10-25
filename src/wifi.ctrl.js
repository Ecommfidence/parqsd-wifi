angular.module('index')
.controller('wifiCtrl', ['$scope', '$timeout', '$http', '$location', function ($scope, $timeout, $http, $location) {
	$scope.errorInEmail = true;
	$scope.agree = true;
	$scope.subscribe = true;
	var subscribed = false;

	$scope.$watch('email', function (newVal, oldVal){
		$scope.errorInEmail = newVal && newVal.length > 0 && !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(newVal);
	});

	$scope.fetch = function (){
		if(!subscribed && 
				$scope.fname && //
				$scope.fname.length > 0 && 
				$scope.lname && 
				$scope.lname.length > 0 && 
				$scope.email && 
				$scope.email.length > 0 && 
				!$scope.errorInEmail && 
				$scope.agree &&
				$scope.subscribe){
			subscribed = true;//
			(function crossDomainRequest(params, options) { // Put This in a directive and make the user unable to click the submit more than once (make the post method more than once with the same email)
				// Add the iframe with a unique name
				if(!params) return;
				var iframe = $("<iframe>")
				,uniqueString = '398df374-325d-4bc9-b750-a54e57e0ab44';// THIS IS JUST SOME UNIQUE STRING
				$('body').append(iframe);
				iframe.css('display', 'none');
				iframe[0].contentWindow = {
					name: uniqueString
				};

				// construct a form with hidden inputs, targeting the iframe
				var form = $("<form>")
				.attr('target', uniqueString)
				.attr('action', options.action)
				.attr('method', options.method || 'POST');

				// repeat for each parameter
				for(var prop in params){
					if(!params.hasOwnProperty(prop)) continue;
					var input = $("<input>")
					.attr('type', "hidden")
					.attr('name', prop)
					.attr('value', params[prop]);
					console.log(input);
					form.append(input);
				}

				$('body').append(form);
				$(form).submit(function(ev){
					iframe.remove();
					form.remove();
					if(options.redirectTo) $location.path(options.redirectTo).replace();
					ev.preventDefault();
				});
				$(form).submit();
			})({
				'EMAIL':$scope.email
				,'FNAME':$scope.fname
				,'LNAME':$scope.lname
			}, {
				action: '//parqsd.us8.list-manage.com/subscribe/post?u=ad0cc5107731b466cd161f702&amp;id=738d9979d0'
				,method: 'POST'
				,redirectTo: '/done'
			});
		}
	};
}]);