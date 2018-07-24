var app = angular
  .module("myapp", ["ngRoute", "ngMessages", "ngSanitize"])
  .directive("onFinishRender", function($timeout) {
    return {
      restrict: "A",
      link: function(scope, element, attr) {
        if (scope.$last === true) {
          $timeout(function() {
            scope.$emit(
              attr.broadcasteventname
                ? attr.broadcasteventname
                : "ngRepeatFinished"
            );
          });
        }
      }
    };
  });
var baseurl = "http://18.191.0.240:3000";
app.constant("config", {
  baseURL: baseurl,
  getproduct_list: baseurl + "/product/list/product/post",
  getbundleList: baseurl + "/product/list/product_bundle/post",
  submitBundle_review: baseurl + "/product/review/post",
  addToCart: baseurl + "/cart/add"
});
app.config(function($routeProvider, $locationProvider, $httpProvider) {
  // $locationProvider.html5Mode(true);
});

app.filter("spaceless", function() {
  return function(input) {
    if (input) {
      return input.replace(/\s+/g, "-");
    }
  };
});
app.filter("toster"),
  function() {
    return function(type, msg) {
      // Display a success toast, with a title
      toastr.success("Have fun storming the castle!", "Miracle Max Says");
    };
  };
