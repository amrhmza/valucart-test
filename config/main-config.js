(function(appConfig) {
  "use strict";

  // *** main dependencies *** //
  const createError = require("http-errors");
  const express = require("express");
  const path = require("path");
  const cookieParser = require("cookie-parser");
  const logger = require("morgan");
  const bodyParser = require("body-parser");

  // *** load environment variables *** //
  require("dotenv").config();

  appConfig.init = function(app, express) {
    // view engine setup
    app.set("views", path.join(__dirname, "../views"));
    app.set("view engine", "ejs");

    app.use(logger("dev"));
    app.use(express.json());
    app.use(
      express.urlencoded({
        extended: false
      })
    );
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );

    /**bodyParser.json(options)
     * Parses the text as JSON and exposes the resulting object on req.body.
     */
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "../public")));
  };
})(module.exports);
