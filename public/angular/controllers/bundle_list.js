app.controller("bundle_listing", function(
  $scope,
  $rootScope,
  $location,
  $http,
  $timeout,
  $filter,
  config,
  querydata,
  getbundleList,
  getWishList
) {
  $scope.productData = [];
  $scope.page = 0;
  $scope.sub_cat_active = 0;
  $scope.nextcall = 1;
  $scope.queryparam = querydata.queryparam;
  $scope.filters_apply = function() {
    let filterdata = $location.search();
    if (filterdata.sub_cat) {
      $scope.sub_cat_active = filterdata.sub_cat;
    }
    if (filterdata.price_start || filterdata.price_end) {
      let start = filterdata.price_start ? filterdata.price_start : "";
      let end = filterdata.price_end ? filterdata.price_end : "";
      $(".pri_" + start + "_" + end).prop("checked", true);
    }
    if (filterdata.discount_start || filterdata.discount_end) {
      let start = filterdata.discount_start ? filterdata.discount_start : "";
      let end = filterdata.discount_end ? filterdata.discount_end : "";
      $(".dis_" + start + "_" + end).prop("checked", true);
    }
    if (filterdata.brand) {
      let object = filterdata.brand.split(",");
      $scope.c = {};
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const element = object[key];
          $scope.c[element] = parseInt(element);
        }
      }
    }
  };
  $scope.getlist = function() {
    let queryparams = $location.search();
    for (const key in queryparams) {
      if (queryparams.hasOwnProperty(key)) {
        const element = queryparams[key];
        $scope.queryparam[key] = element;
      }
    }
    getbundleList
      .getlist(querydata.queryparam, $scope.page)
      .then(function(response) {
        var userAuth = $.cookie("vcartAuth") ? JSON.parse($.cookie("vcartAuth")) : "";      
        $scope.loggedStatus= (userAuth.status=="success")?true:false;
        let listdata = response.data.results.response;
        if (listdata != "") {
          angular.forEach(listdata, function(value, key) {
            $scope.productData.push(value);
          });
          $scope.nextcall = 1;
          $scope.page++;
        } else {
          $scope.nextcall = 0;
        }
      })
      .catch(function(response) {
        console.log(response.status);
      });
  };
  $scope.filters_apply();
  $scope.getlist();
  $(window).scroll(function() {
    var bodypos = $("body")[0].scrollHeight;
    var windowh = $(window).height();
    bodypos = bodypos - windowh;
    var windowpos = $(window).scrollTop();
    var persentage = Math.round((windowpos / bodypos) * 100);
    if (Math.round(persentage) > 80 && $scope.nextcall == 1) {
      $scope.nextcall = 0;
      $scope.getlist();
    }
  });
  $scope.qty_plus = function(fieldName, index) {
    var currentVal = parseInt($("input[name=" + fieldName + index + "]").val());
    $scope.qty = currentVal + 1;
    // If is not undefined
    if (!isNaN(currentVal)) {
      // Increment
      $("input[name=" + fieldName + index + "]").val(currentVal + 1);
    } else {
      // Otherwise put a 0 there
      $("input[name=" + fieldName + index + "]").val(1);
    }
  };

  // This button will decrement the value till 0
  $scope.qty_minus = function(fieldName, index) {
    var currentVal = parseInt($("input[name=" + fieldName + index + "]").val());
    $scope.qty = currentVal - 1;
    // If is not undefined
    if (!isNaN(currentVal) && currentVal > 1) {
      // Increment
      $("input[name=" + fieldName + index + "]").val(currentVal - 1);
    } else {
      // Otherwise put a 0 there
      $("input[name=" + fieldName + index + "]").val(1);
    }
  };
  $scope.filters = function(type, p1, p2) {
    $scope.productData = [];
    $scope.page = 0;
    $scope.nextcall = 1;
    switch (type) {
      case "sub_cat":
        $location.search("sub_cat", p1);
        $scope.getlist();
        break;
      case "price":
        if (p1) {
          $location.search("price_start", p1);
        } else {
          $location.search("price_start", null);
        }
        if (p2) {
          $location.search("price_end", p2);
        } else {
          $location.search("price_end", null);
        }
        $scope.getlist();
        break;
      case "discount":
        if (p1) {
          $location.search("discount_start", p1);
        } else {
          $location.search("discount_start", null);
        }
        if (p2) {
          $location.search("discount_end", p2);
        } else {
          $location.search("discount_end", null);
        }
        $scope.getlist();
        break;
      case "brand":
        let element = "";
        for (const key in $scope.c) {
          if ($scope.c.hasOwnProperty(key)) {
            if ($scope.c[key]) {
              element += $scope.c[key] + ",";
            }
          }
        }
        let elements = element.replace(/(^,)|(,$)/g, "");
        $location.search("brand", elements);
        $scope.getlist();
        break;
      case "sort":
        $location.search("order_by", p1);
        $scope.getlist();
        break;
      default:
    }
  };

  // Wishlist Add and Remove
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
