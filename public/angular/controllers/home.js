app.controller("home", function (
    $scope,
    $rootScope,
    $location,
    $http,
    $timeout,
    $filter,
    product_details,
    getWishList,
) {
    /**
     *
     * @param {*} data
     */
    $scope.addtocart = function (data) {
        var currentVal = parseInt($("input[name=qty_" + data + "]").val());
        if (currentVal > 0) {
            product_details
                .addToCart(currentVal, data)
                .then(function (response) {
                    if (response.data.results.status != "200") {
                        toastr.warning(response.data.results.msg);
                    } else {
                        toastr.success(response.data.results.msg);
                    }
                })
                .catch(function (response) {
                    toastr.warning(response.data.results.msg);
                });
        } else {
            toastr.error("Please check the quantity");
        }
    };

    /**
     * Cart Qty Plus
     * @param {Number} fieldName
     * @param {Number} index
     */
    $scope.qty_plus = function (fieldName, index) {
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
    /**
     * Cart Qty minus
     * @param {Number} fieldName
     * @param {Number} index
     */
    // This button will decrement the value till 0
    $scope.qty_minus = function (fieldName, index) {
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

    // Wishlist Add and Remove
    $scope.addwish = function (product_id, item, index) {
        //console.log(wtype);
        let productData = {
            product_id: product_id,
            is_bundle: false,
            wish_type: item ? "remove" : "add"
        };
        var userAuth = typeof $.cookie("vcartAuth") ?
            JSON.parse($.cookie("vcartAuth")) :
            "";
        var usertoken = userAuth != "" ? userAuth.token : "";

        getWishList
            .addWish(productData, usertoken)
            .then(function (response) {
                var res = response.data.msg;
                if (res == "success") {
                    $scope.productData[index].wishlist = item ? false : true;
                    if (item == false) {
                        toastr.success(response.data.results);
                    } else {
                        toastr.warning(response.data.results);
                    }
                }
            })
            .catch(function (response) {
                console.log(response);
            });
    };

});