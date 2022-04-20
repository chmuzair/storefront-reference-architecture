"use strict";

var server = require("server");

server.get("Show", function(req, res, next) {
    var actionUrl = dw.web.URLUtils.url("Custom_Account-Handler");
    var customForm = srver.forms.getForm("customForm");
    customForm.clear();

    res.render("/custom_account/custom_Account_form", {
        actionUrl: actionUrl,
        customForm: customForm,
    });
    next();
});

server.post("Handler", server.middleware.https, function(req, res, next) {
    var customForm = server.forms.getForm("customForm");
    var continueUrl = dw.web.URLUtils("Custom_Account-Show");

    //validation

    if (customForm.valid) {
        res.render("/custom_account/formSuccess", {
            continueUrl: continueUrl,
            customForm: customForm,
        });
    } else {
        res.render("/custom_account/formError", {
            errorMsg: dw.web.Resource.msg(
                "error.crossfieldvalidation",
                "customFrom",
                null
            ),
            continueUrl: continueUrl,
        });
    }
    next();
});

module.exports = server.exports();