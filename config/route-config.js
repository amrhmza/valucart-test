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
    const productdetailsRouter = require("../routes/product-listing");

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
  };
})(module.exports);
