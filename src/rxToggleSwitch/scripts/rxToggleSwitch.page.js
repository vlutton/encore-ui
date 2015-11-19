/*jshint node:true*/
var Page = require('astrolabe').Page;

/**
   @namespace
 */
var rxToggleSwitch = {
    btnToggleSwitch: {
        get: function () {
            return this.rootElement.$('.rx-toggle-switch');
        }
    },

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
       @returns {Boolean} Whether or not the switch component is currently enabled.
     */
    isEnabled: {
        value: function () {
            return this.btnToggleSwitch.getAttribute('class').then(function (classes) {
                return classes.split(' ').indexOf('on') > -1;
            });
        }
    },

    /**
       @function
       @returns {undefined}
    */
    enable: {
        value: function () {
            var page = this;
            return this.isDisabled().then(function (disabled) {
                if (disabled) {
                    page.btnToggleSwitch.click();
                }
            });
        }
    },

    /**
       @function
       @returns {Boolean} Whether or not the switch component is currently disabled.
     */
    isDisabled: {
        value: function () {
            return this.isEnabled().then(function (enabled) {
                return !enabled;
            });
        }
    },

    /**
       @function
       @returns {undefined}
    */
    disable: {
        value: function () {
            var page = this;
            return this.isEnabled().then(function (enabled) {
                if (enabled) {
                    page.btnToggleSwitch.click();
                }
            });
        }
    },

    /**
       @returns {String} The current text of the switch.
     */
    text: {
        get: function () {
            return this.btnToggleSwitch.$('span').getText();
        }
    }
};

/**
   @exports encore.rxToggleSwitch
 */
exports.rxToggleSwitch = {
    /**
       @function
       @param {WebElement} rxToggleSwitchElement - WebElement to be transformed into an rxToggleSwitchElement object.
       @returns {rxToggleSwitch} Page object representing the rxToggleSwitch object.
     */
    initialize: function (rxToggleSwitchElement) {
        rxToggleSwitch.rootElement = {
            get: function () { return rxToggleSwitchElement; }
        };
        return Page.create(rxToggleSwitch);
    },

    /**
       @returns {rxToggleSwitch} Page object representing the _first_ rxToggleSwitch object found on the page.
    */
    main: (function () {
        rxToggleSwitch.rootElement = {
            get: function () { return $('rx-toggle-switch'); }
        };
        return Page.create(rxToggleSwitch);
    })()
};
