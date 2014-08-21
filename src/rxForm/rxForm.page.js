/*jshint node:true*/
var Page = require('astrolabe').Page;

exports.rxForm = Page.create({
    // Elements
    rxFormInput: {
        get: function () {
            return $('rx-form-item[label="Volume Name"]');
        }
    }
});
