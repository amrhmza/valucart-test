app.controller("product_details", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config,
  getWishList
) {

  //Prdouct Review Controler
  $scope.addwish = function(product_id, is_bundle, item) {
    
    var elem= angular.element(item);
    var wtype= elem.attr('data-type');
    //console.log(wtype);
    let productData = {
      product_id: product_id,
      is_bundle: is_bundle,
      wish_type: wtype
    };
    var userAuth = typeof $.cookie("vcartAuth") ? JSON.parse($.cookie("vcartAuth")) : "";
    var usertoken= (userAuth!="")?userAuth.token: "";

    getWishList
      .addWish(productData, usertoken)
      .then(function(response) {
        console.log(response);
        var res= response.data.msg;
        if(res=="success"){
          var wishvalue= (wtype=="add")?"remove":"add";
          elem.attr('data-type', wishvalue);
          if(wishvalue=="remove"){
            elem.addClass("wishheartt");
            toastr.success(response.data.results);
          }
          else{
            elem.removeClass("wishheartt");
            toastr.warning(response.data.results);
          }
        }
      })
      .catch(function(response) {
        console.log(response);
      });
  };
  
});
