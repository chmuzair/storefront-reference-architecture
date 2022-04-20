'use strict';

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');

//extend Home controller functionality using the extend method
server.extend(module.superModule);

//insert functionality before the Show route using server.prepend
// server.prepend('Show', cache.applyDefaultCache, function(req, res, next) {
//     var viewData = res.getViewData();
//     viewData.param1 = 'This is from prepend';
//     res.setViewData(viewData);
//     next();
// });

/* 
 * Reuse the viewData from the prepend, and append new data + a query parameter value
 * Also, use a custom middleware method: it extends the base cache.js script
 */
server.append('Show', cache.applyCustomCache, function(req, res, next) {
    var viewData = res.getViewData();
    viewData = {
        demo1: 'This is Home page',
        demo2: res.cachePeriod + ' ' + res.cachePeriodUnit
    };
    next();
});

module.exports = server.exports();