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
  getproduct_list: baseurl + "/product/list/product/post"
});
