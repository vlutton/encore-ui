/*jshint node:true*/
var _ = require('lodash');
var Page = require('astrolabe').Page;

/**
   @namespace
 */
var rxCollapse = {

    /**
       @function
       @returns {Boolean} Whether the root element is currently displayed.
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    isExpanded: {
        get: function () {
            return this.rootElement.$('.expanded').isPresent();
        }
    },

    hasCustomTitle: {
        value: function () {
            return this.elemWrapper.getAttribute('class').then(function (classes) {
                classes = classes.split(' ');
                if (_.contains(classes, 'collapse-title-wrap-custom')) {
                    return true;
                } else {
                    return false;
                }
            });

        }
    },

    elemWrapper: {
        get: function () {
            return this.rootElement.$('.collapse-title-wrap');
        }
    },

    // This is the "custom" title element
    title: {
        get: function () {
            return this.rootElement.$('.rx-collapse-title');
        }
    },

    // This is the "default" title element, used for the
    // "See More"/"See Less" text
    eleDefaultTitle: {
        get: function () {
            return this.rootElement.$('.smlTitle');

        }
    },

    titleText: {
        value: function () {
            var page = this;
            return this.hasCustomTitle().then(function (hasCustomTitle) {
                if (hasCustomTitle) {
                    return page.title.getText();
                } else {
                    return page.eleDefaultTitle.getText();
                }
            });
        }
    },

    btnToggle: {
        get: function () {
            return this.rootElement.$('.double-chevron');
        }
    },

    btnSeeMoreLess: {
        get: function () {
            return this.rootElement.$('.smlTitle');
        }
    },

    elBody: {
        get: function () {
            return this.rootElement.$('.collapse-body');
        }
    },

    toggle: {
        value: function () {
            var page = this;
            return this.hasCustomTitle().then(function (hasCustomTitle) {
                if (hasCustomTitle) {
                    return page.btnToggle.click();
                } else {
                    return page.btnSeeMoreLess.click();
                }
            });
        }
    }

};

/**
   @exports encore.rxCollapse
 */
exports.rxCollapse = {

    /**
       @function
       @param {WebElement} rxCollapseElement - WebElement to be transformed into an rxCollapseElement object.
       @returns {rxCollapse} Page object representing the rxCollapse object.
     */
    initialize: function (rxCollapseElement) {
        rxCollapse.rootElement = {
            get: function () { return rxCollapseElement; }
        };
        return Page.create(rxCollapse);
    },

    /**
       @returns {rxCollapse} Page object representing the _first_ rxCollapse object found on the page.
    */
    main: (function () {
        rxCollapse.rootElement = {
            get: function () { return $('rx-collapse'); }
        };
        return Page.create(rxCollapse);
    })()

};
