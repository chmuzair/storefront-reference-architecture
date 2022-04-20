/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
var guard = require('storefront_controllers/cartridge/scripts/guard');
var ISML = require('dw/template/ISML');

function start() {
    ISML.renderTemplate(
        'helloworld1.isml', {
            myParameteronISML: 'Hello from Controllers'
        }
    );
}
exports.Start = guard.ensure(['get'], start);