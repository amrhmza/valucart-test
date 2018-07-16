(function(routeConfig) {
  "use strict";

  routeConfig.init = function(app) {
    // *** routes *** //
    const cityRouter = require("../routes/select_city");
    const areaRouter = require("../routes/select_area");
    const homeRouter = require("../routes/home");
    const usersRouter = require("../routes/users");
    const detailsRouter = require("../routes/details");
    const cartRouter = require("../routes/cart");
    const checkoutRouter = require("../routes/checkout");
    const paymentRouter = require("../routes/success");
    const bundlelistRouter = require("../routes/bundle_list");
    const bundledetailRouter = require("../routes/bundle_detail");
    const changepasswordRouter = require("../routes/change_password");
    const cancelorderRouter = require("../routes/cancelorder");
    const createbundleRouter = require("../routes/create-bundle");
    const createbundlecpRouter = require("../routes/create-bundle-cp");
    const productlistingRouter = require("../routes/product-listing");
    const productdetailsRouter = require("../routes/product-detail");
    const profileRouter = require("../routes/profile");
    const editprofileRouter = require("../routes/edit-profile");
    const mybundlesRouter = require("../routes/mybundles");
    const mybundleeditRouter = require("../routes/mybundle-edit");
    const myordersRouter = require("../routes/myorders");
    const myorderdetailsRouter = require("../routes/myorder-details");
    const myshoppingRouter = require("../routes/myshopping");
    const myshoppingdashboardRouter = require("../routes/myshopping-dashboard");
    const newaddressRouter = require("../routes/new-address");
    const ordertrackingRouter = require("../routes/order-tracking");
    const otpRouter = require("../routes/otp");
    const replacementRouter = require("../routes/request-replacement");
    const replacementsuccessRouter = require("../routes/replacement-success");
    const servicerequestRouter = require("../routes/service-request");
    const subscribeRouter = require("../routes/subscribe");

    // *** register routes *** //
    app.use("/city", cityRouter);
    app.use("/area", areaRouter);
    app.use("/", homeRouter);
    app.use("/users", usersRouter);
    app.use("/details", detailsRouter);
    app.use("/cart", cartRouter);
    app.use("/checkout", checkoutRouter);
    app.use("/payment", paymentRouter);

    /*** Bundle and product routes ***/
    app.use("/bundle-list", bundlelistRouter);
    app.use("/bundle-detail", bundledetailRouter);
    app.use("/product-listing", productlistingRouter);
    app.use("/product-detail", productdetailsRouter);

    /*** Myaccount routes ***/
    app.use("/change-password", changepasswordRouter);
    app.use("/cancel-order", cancelorderRouter);
    app.use("/create-bundle", createbundleRouter);
    app.use("/create-bundle-cp", createbundlecpRouter);
    app.use("/profile", profileRouter);
    app.use("/edit-profile", editprofileRouter);
    app.use("/mybundles", mybundlesRouter);
    app.use("/mybundle-edit", mybundleeditRouter);
    app.use("/myorders", myordersRouter);
    app.use("/myorder-details", myorderdetailsRouter);
    app.use("/myshopping", myshoppingRouter);
    app.use("/myshopping-dashboard", myshoppingdashboardRouter);
    app.use("/new-address", newaddressRouter);
    app.use("/order-tracking", ordertrackingRouter);
    app.use("/otp", otpRouter);
    app.use("/request-replacement", replacementRouter);
    app.use("/replacement-success", replacementsuccessRouter);
    app.use("/service-request", servicerequestRouter);
    app.use("/subscribe", subscribeRouter);
  };
})(module.exports);
