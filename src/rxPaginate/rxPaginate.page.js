/*jshint node:true*/
var Page = require('astrolabe').Page;

exports.rxPaginate = Page.create({
    // Elements
    rxPaginateElement: {
        get: function () {
            return this.findElement(this.by.id('rxPaginateElement'));
        }
    }
});
