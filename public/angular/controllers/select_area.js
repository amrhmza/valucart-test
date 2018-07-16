app.controller("select_area", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config
) {
  //////select_area/////////
  var select_area = document.forms.selectArea;
  select_area.onsubmit = function() {
    console.log($scope.area);
    localStorage.setItem("area", $scope.area);
    window.location.href = "/";
  };
});
