var _ = require('lodash');
var Page = require('astrolabe').Page;

/**
   Clicking an action menu item will trigger this function.
   By default, it returns the page object outlined below.
   @namespace rxActionMenu.action.action
 */
var action = function (actionElement) {

    return Page.create({

        rootElement: {
            get: function () {
                return actionElement;
            }
        },

        /**
           Returns a modal object to manipulate later, with given `customFunctionality`.
           See <a href="#encore.module_rxModalAction.initialize">rxModalAction.initialize</a>
           for more information about what `customFunctionality` means here.
           Using a modal object is the default action since many instances of the action menu serve to launch
           modals. If you're not using rxActionMenu to launch modals, over-ride this entire section
           when calling <a href="#encore.module_rxActionMenu.initialize">rxActionMenu.initialize</a>,
           where you can pass in a custom `actionConstructorFn`.
           @memberof rxActionMenu.action.action
           @function
           @param {Object} customFunctionality - Custom functionality of the modal, should you use one.
           @returns {rxModalAction} A modal that gets opened by clicking the action menu item.
        */
        openModal: {
            value: function (customFunctionality) {
                actionElement.$('.modal-link').click();
                return exports.rxModalAction.initialize(customFunctionality);
            }
        },

        /**
           @memberof rxActionMenu.action.action
           @returns {String} The trimmed text of the action menu item.
         */
        text: {
            get: function () {
                return actionElement.getText().then(function (text) {
                    return text.trim();
                });
            }
        }

    });
};

/**
   @namespace
 */
var rxActionMenu = {

    icoCog: {
        get: function () {
            return this.rootElement.$('.fa-cog');
        }
    },

    /**
       This selector will grab any top-level child elements under `.actions-area`, one level deep.
       Since action menus allow for free-form html entry, there is no guarantee that any
       particular structure will appear inside the action menu. However, we can be sure
       that they'll use the `.actions-area` class to style it, and inside of it will be some
       sort of element list. This exposes a hook into the html for matching text or counting nodes.
       @private
    */
    cssFirstAny: {
        get: function () {
            return '.actions-area > *';
        }
    },

    /**
       @function
       @returns {Boolean} Whether or not the action cog is showing its underlying menu.
     */
    isExpanded: {
        value: function () {
            return this.rootElement.$('.action-list').getAttribute('class').then(function (className) {
                return className.indexOf('ng-hide') === -1;
            });
        }
    },

    /**
       @function
       @returns {Boolean} Whether or not the action cog is hiding its underlying menu.
     */
    isCollapsed: {
        value: function () {
            return this.isExpanded().then(function (isExpanded) {
                return !isExpanded;
            });
        }
    },

    /**
       Clicks the action cog to expand the action menu, unless it's already open.
       @function
       @returns {undefined}
     */
    expand: {
        value: function () {
            var page = this;
            return this.isCollapsed().then(function (collapsed) {
                if (collapsed) {
                    page.icoCog.click();
                }
            });
        }
    },

    /**
       Clicks the action cog to collapse the action menu, unless it's already closed.
       @function
       @returns {undefined}
     */
    collapse: {
        value: function () {
            var page = this;
            return this.isExpanded().then(function (expanded) {
                if (expanded) {
                    page.icoCog.click();
                }
            });
        }
    },

    /**
       Will expand the action menu to determine if the action is available.
       @function
       @param {String} actionName - The name of the action menu item to check for existence.
       @returns {Boolean} Whether or not the action menu has an item matching the text `actionName`.
     */
    hasAction: {
        value: function (actionName) {
            this.expand();
            var actionElement = this.rootElement.element(by.cssContainingText(this.cssFirstAny, actionName));
            return actionElement.isPresent().then(function (present) {
                return present ? actionElement.isDisplayed() : present;
            });
        }
    },

    /**
       @namespace rxActionMenu.action
       @param {String} actionName - Name of the action item to return an {@link rxActionMenu.action.action} object for.
       @returns {*} Defaults to returning an {@link rxActionMenu.action.action} object if none was specified at
       initialization. See <a href="#encore.module_rxActionMenu.initialize">encore.rxActionMenu.initialize</a>
       for more details about passing in a custom action item function.
     */
    action: {
        value: function (actionName) {
            this.expand();
            var actionElement = this.rootElement.element(by.cssContainingText(this.cssFirstAny, actionName));
            return this.actionConstructorFn(actionElement);
        }
    },

    /**
       Does not expand the action menu to determine the count of menu items.
       @function
       @returns {Number} The number of action items present in the action menu.
     */
    actionCount: {
        value: function () {
            return this.rootElement.$$(this.cssFirstAny).count();
        }
    }

};

/**
   @exports encore.rxActionMenu
 */
exports.rxActionMenu = {

    /**
      Passing in an `actionConstructorFn` will default to calling that for any
      calls made to `rxActionMenu.action('Action Name')`. If it's not defined, it defaults to a function
      that creates a page object represented by {@link rxActionMenu.action.action}.
      Most times you'll want to leave this `undefined`.
      @function
      @param {WebElement} rxActionMenuElement - WebElement to be transformed into an rxActionMenu object
      @param {Function=} actionConstructorFn - Function to invoke on calling {@link rxActionMenu.action}.
      @returns {rxActionMenu} Page object representing the rxActionMenu object.
    */
    initialize: function (rxActionMenuElement, actionConstructorFn) {
        rxActionMenu.rootElement = {
            get: function () {
                return rxActionMenuElement;
            }
        };

        rxActionMenu.actionConstructorFn = {
            get: function () {
                if (_.isFunction(actionConstructorFn)) {
                    return actionConstructorFn;
                }
                return action;
            }
        };

        return Page.create(rxActionMenu);
    }

};
