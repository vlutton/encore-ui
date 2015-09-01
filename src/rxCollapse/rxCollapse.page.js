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

    /**
       @function
       @returns {Boolean} Whether or not the component is currently expanded.
     */
    isExpanded: {
        value: function () {
            return this.rootElement.$('.expanded').isPresent();
        }
    },

    /**
       @function
       @returns {Boolean} Whether or not the component is currently collapsed.
     */
    isCollapsed: {
        value: function () {
            return this.isExpanded().then(function (expanded) {
                return !expanded;
            });
        }
    },

    /**
       @function
       @returns {Boolean} Whether or not the component has a custom title.
     */
    hasCustomTitle: {
        value: function () {
            return this.rootElement.$('.collapse-title-wrap').getAttribute('class').then(function (classes) {
                return _.contains(classes.split(' '), 'collapse-title-wrap-custom');
            });
        }
    },

    /**
       Will return the custom title's text if the component uses one. Otherwise, it'll return
       the default title, found in the `.sml-title` (see-more-less-title) class.
       @returns {String} Either the custom title's text, or the default title.
     */
    title: {
        get: function () {
            var page = this;
            return this.hasCustomTitle().then(function (hasCustomTitle) {
                if (hasCustomTitle) {
                    return page.rootElement.$('.rx-collapse-title').getText();
                } else {
                    return page.rootElement.$('.sml-title').getText();
                }
            });
        }
    },

    /**
       Will expand the component if collapsed, or will collapse it if it's expanded.
       @function
       @returns {undefined}
     */
    toggle: {
        value: function () {
            var page = this;
            return this.hasCustomTitle().then(function (hasCustomTitle) {
                if (hasCustomTitle) {
                    return page.rootElement.$('.double-chevron').click();
                } else {
                    return page.rootElement.$('.sml-title').click();
                }
            });
        }
    },

    /**
       Will toggle the component *only* if it's currently collapsed.
       @returns {undefined}
     */
    expand: {
        value: function () {
            var page = this;
            return this.isCollapsed().then(function (collapsed) {
                if (collapsed) {
                    page.toggle();
                }
            });
        }
    },

    /**
       Will toggle the component *only* if it's currently expanded.
       @returns {undefined}
     */
    collapse: {
        value: function () {
            var page = this;
            return this.isExpanded().then(function (expanded) {
                if (expanded) {
                    page.toggle();
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
