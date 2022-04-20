'use strict';
var server = require('server');
var URLUtils = require('dw/web/URLUtils');



server.get(
    'Show',
    server.middleware.https,
    function(req, res, next) {
        var actionUrl = dw.web.URLUtils.url('Account1-Handler');
        var profileForm = server.forms.getForm('profile');
        profileForm.clear();


        res.render('/account/accountsignup', {
            actionUrl: actionUrl,
            profileForm: profileForm
        });
        next();

    }
);

server.post(
    'Handler',
    server.middleware.https,
    function(req, res, next) {
        var action = dw.web.URLUtils.url('Account1-Success');
        var profileForm = server.forms.getForm('profile');
        var continueUrl = dw.web.URLUtils.url('Account1-Show');
        var CustomObjectMgr = require('dw/object/CustomObjectMgr');
        var redirectUrl = dw.web.URLUtils.url('Account1-Success');

        //server-side validation

        if (profileForm.valid) {
            this.on('route:BeforeComplete', function(req, res) {
                var Transaction = require('dw/system/Transaction');
                try {
                    Transaction.wrap(function() {


                        var CustomObject = CustomObjectMgr.createCustomObject('Profile', profileForm.email.value);
                        CustomObject.custom.firstName = profileForm.fname.value;
                        CustomObject.custom.lastName = profileForm.lname.value;
                        CustomObject.custom.phone = profileForm.phone.value;
                        CustomObject.custom.password = profileForm.password.value;

                        // res.render('/account/accountsuccess');

                        res.json({
                            success: true,
                            redirectUrl: URLUtils.url('Account1-Success').toString()
                        });
                    });
                } catch (e) {
                    var err = e;
                    var Resource = require('dw/web/Resource');
                    if (err.javaName === "MetaDataException") {
                        /* Duplicate primary key on CO: send back message to client-side. This is not an error: 
                           it is possible a user tries to subscribe with the same email multiple times */
                        res.json({
                            success: false,
                            error: [Resource.msg('error.subscriptionexists', 'profile', null)]
                        });
                    } else {
                        // Missing CO definition: Log error with message for site admin, respond to client side with error page URL
                        var Logger = require('dw/system/Logger');
                        Logger.getLogger("profile create").error(Resource.msg('error.customobjectmissing', 'profile', null));
                        // Show error page: there is nothing else the user can do
                        res.setStatusCode(500);
                        res.json({
                            error: true,
                            redirectUrl: URLUtils.url('Error-Start').toString()
                        });
                    }
                }
            }); //end route:BeforeComplete
        } else {
            res.setStatusCode(500);
            res.json({
                error: true,
                redirectUrl: URLUtils.url('Error-Start').toString()
            });
        }
        return next();
    }
);

server.get(
    'Success',
    server.middleware.https,
    function(req, res, next) {
        res.render('/account/accountsuccess', {
            continueUrl: URLUtils.url('Account1-Show'),
            newsletterForm: server.forms.getForm('profile')
        });

        next();
    }
);


module.exports = server.exports();