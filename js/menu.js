var classApp = angular.module('classApp', []);

classApp.controller('classCtrl', function ($scope, $window) {
	$scope.color1 = "rgba(245, 245, 245, 1)";
  	$scope.activeButton1 = function() {
  	if($scope.color1 == "rgba(46, 255, 138, 1)"){
		$scope.color1 = "rgba(245, 245, 245, 1)";
		$scope.activated1 = false;
  	} else {
  		$scope.color1 = "rgba(46, 255, 138, 1)";
  		$scope.activated1 = true;
  	}
  	}

  	$scope.activeButton2 = function() {
  	if($scope.color2 == "rgba(46, 255, 138, 1)"){
		$scope.color2 = "rgba(245, 245, 245, 1)";
		$scope.activated2 = false;
  	} else {
  		$scope.color2 = "rgba(46, 255, 138, 1)";
  		$scope.activated2 = true;
  	}
  }

  $scope.activeButton3 = function() {
  	if($scope.color3 == "rgba(46, 255, 138, 1)"){
		$scope.color3 = "rgba(245, 245, 245, 1)";
		$scope.activated3 = false;
  	} else {
  		$scope.color3 = "rgba(46, 255, 138, 1)";
  		$scope.activated3 = true;
  	}
  } 

  $scope.play = function() {
  	if($scope.activated1 == true && $scope.activated2 == true && $scope.activated3 == true){
		$window.location.href = "http://" + $window.location.host + "/game.html";
  	} else {
  		alert("You must select three options");
  	}
  } 
});