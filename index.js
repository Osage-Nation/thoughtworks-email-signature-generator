/* global require, process, __dirname, console */
require("newrelic");
var Express = require("express"),
    newrelic = require("newrelic"),
    compression = require("compression"),
    serveStatic = require('serve-static'),
    pug = require("pug"),
    port = Number(process.env.PORT || 5000),
    staticAssetsUrl = process.env.STATIC_ASSETS_URL || ".",
    directory = process.env.NODE_ENV === "production" ? "/build" : "/public",
    server = new Express();

server.locals.newrelic = newrelic;

server.use(compression());
// This is required to serve legacy copied email signatures
server.use(serveStatic(__dirname + "/public"));

server.set("views", __dirname + directory + "/pug");
server.engine("pug", pug.__express);

server.get("/", function (request, response) {
    "use strict";
    response.set("Cache-Control", "no-cache");
    response.render("index.pug", {staticAssetsUrl: staticAssetsUrl});
});

server.listen(port);
console.log("Server listening on port " + port);
