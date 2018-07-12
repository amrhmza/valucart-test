(function(routeConfig) {
  "use strict";

  routeConfig.init = function(app) {
    // *** routes *** //
    const indexRouter = require("../routes/index");
    const areaRouter = require("../routes/select_area");
    const homeRouter = require("../routes/home");
    const usersRouter = require("../routes/users");
    const detailsRouter = require("../routes/details");
    const cartRouter = require("../routes/cart");
    const checkoutRouter = require("../routes/checkout");
    const paymentRouter = require("../routes/success");

    // *** register routes *** //
    app.use("/", indexRouter);
    app.use("/area", areaRouter);
    app.use("/home", homeRouter);
    app.use("/users", usersRouter);
    app.use("/details", detailsRouter);
    app.use("/cart", cartRouter);
    app.use("/checkout", checkoutRouter);
    app.use("/success", paymentRouter);
  };
})(module.exports);
