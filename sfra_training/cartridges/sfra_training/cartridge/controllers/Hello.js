// 'use strict';
// var server = require('server');
// var cache = require('*/cartridge/scripts/middleware/cache');

// server.get('Start', cache.applyDefaultCache, function(req, res, next) {
//     res.render('helloWorld', { param1: Site.current.name });
//     next();
// });

// module.exports = server.exports();

"use strict";

var server = require("server");
var cache = require("*/cartridge/scripts/middleware/cache");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");
var pageMetaData = require("*/cartridge/scripts/middleware/pageMetaData");

server.get("World", cache.applyDefaultCache, function(req, res, next) {
    res.render("helloWorld", {
        Message: "Hello World! Again.",
    });
    next();
});

module.exports = server.exports();