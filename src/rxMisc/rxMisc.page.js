/*jshint node:true*/
var _ = require('lodash');

/**
 * @namespace
 */
exports.rxMisc = {
    /**
     * @description
     * Equivalent to `browser.actions().mouseDown(elem).mouseUp().perform();`.
     * This function should be used when dealing with odd or unusual behavior while interacting with click events
     * that don't seem to work right. Either the element does not appear to respond to a normal `.click()` call, or
     * the element is responding to more than one click event. This typically happens more often in Firefox than
     * in other browsers. See `htmlSelectOption.selet` for an example of a function that will slow click an element
     * to achieve consistent behavior.
     * @param {WebElement} elem - Web element to "slow click".
     * @returns {undefined}
     */
    slowClick: function (elem) {
        browser.actions().mouseDown(elem).mouseUp().perform();
    },

    /**
     * @description
     * Transform `currencyString` (USD) to an integer representing pennies. Built to reverse
     * Angular's 'currency' filter. Do not pass in fractions of a penny.
     * @param {string} currencyString - Raw text as output by Angular's `currency` filter.
     *
     * @example
     * ```js
     * encore.rxMisc.currencyToPennies('$0.01')      ==  1
     * encore.rxMisc.currencyToPennies('$100 CAN')   ==  10000
     * encore.rxMisc.currencyToPennies('($100 AUS)') == -10000
     * encore.rxMisc.currencyToPennies('$1.10')      ==  110
     * ```
     */
    currencyToPennies: function (currencyString) {
        // ensure string
        var strIn = currencyString.toString();

        // ignore anything that's not a "number"
        var wholeAmount = strIn.replace(/[^0-9.]/g, '');

        // locate decimal
        var decimalIndex = wholeAmount.indexOf('.');
        var normalizedAmount;
        if (decimalIndex > 0) {
            // truncate pennies to 2 decimal places
            normalizedAmount = wholeAmount.slice(0, decimalIndex + 3);
        } else {
            // whole number, concat decimal value
            normalizedAmount = wholeAmount + '.00';
        }

        // remove decimal (leaves us total pennies)
        var pennyAmount = normalizedAmount.replace(/[^0-9]/g, '');

        // Negative number
        if (strIn.indexOf('(') > -1 && strIn.indexOf(')') > -1) {
            pennyAmount *= -1;
        }

        return parseInt(pennyAmount);
    },

    /**
       A convenience function to pass to `.then` when a date is needed from text.
       If there is any manipulation of the text needed to render a valid date in
       javascript, then you shouldn't use this function. If that is the case,
       please see http://rackerlabs.github.io/encore-ui/#/styleguide/basics#date-formatting.
       There should be no need to manipulate a date's text to create a valid date object
       if you are following the styleguide.
       @param {String} dateText - Text that represents the date object in the UI.
       @returns {Date} A date object, returned from `new Date(dateText)`.
       @example
       ```js
       // instead of doing this
       startDate: {
           get: function () {
               return element(by.binding('startDate')).getText().then(function (text) {
                   return new Date(text);
               });
           }
       },

       // use this instead
       endDate: {
           get: function () {
               return element(by.binding('endDate')).getText().then(encore.rxMisc.newDate);
           }
       }
       ```
     */
    newDate: function (dateText) {
        return new Date(dateText);
    },

    /**
       A list of common strings that appear in the UI that represent `null` to a page object.
       Add to this list yourself or create a new one in this namespace for your application.
       @constant
       @example
       ```js
       it('should return null for the user email preferences', function () {
           encore.rxMisc.nullValueMatches.push('Unregistered'); // this is permanent for the test run
           // this element's inner text is "Unregistered", triggering a `null` response
           expect(userPage.emailPreferences).to.eventually.be.null;
       });
       ```
     */
    nullValueMatches: [],

    /**
       If the `elem` is found, invoke `innerFn` on the resulting element's text.
       If there is no element found (or displayed), return `null`.
       If the element is found and displayed, but the text matches something in {@link rxMisc.nullValueMatches},
       then return `null`.
       This is useful when applications feature use of `ng-if` to control various messages to the user.
       @function
       @param {WebElement} elem - The web element that may or may not be present, or displayed, or valid.
       @param {Function} [innerFn] - Function to call on the element should it be present, displayed, and valid.
       @param {*} [fallbackReturnValue=null] - Returned if the web element is not present, or not displayed, or invalid.
       @example
       ```js
       // given this html
       <span class="accent-text">
         <span ng-if="balance.currentBalance">
           {{balance.currentBalance | currency }} {{balance.currency}}
         </span>
         <span ng-if="!balance.currentBalance">
           N/A
         </span>
       </span>

       // this would be your page object
       var balancePage = Page.create({
           balance: {
               get: function () {
                   var balanceElement = element(by.binding('currentBalance'));
                   // will return `null` if "N/A". Otherwise, will transform to Number.
                   return encore.rxMisc.unless(balanceElement, function (elem) {
                       return elem.getText().then(encore.rxMisc.currencyToPennies);
                   });
               }
           }
       });
       ```
     */
    unless: function (elem, innerFn, fallbackReturnValue) {
        if (fallbackReturnValue === undefined) {
            fallbackReturnValue = null;
        }

        return elem.isPresent().then(function (present) {
            if (present) {
                return elem.isDisplayed().then(function (displayed) {
                    if (displayed) {
                        return elem.getText().then(function (text) {
                            if (exports.rxMisc.nullValueMatches.indexOf(text.trim()) > -1) {
                                return fallbackReturnValue;
                            }
                            return innerFn === undefined ? text : innerFn(elem);
                        });
                    }
                    // not displayed
                    return fallbackReturnValue;
                });
            }
            // not present
            return fallbackReturnValue;
        });
    },

    /**
       See https://github.com/Droogans/node-timing.js#sample-output-of-timinggettimes for details.
       @function
       @param {String|Array} [keys] - Key to get (string), keys to get (Array), or all (`undefined`).
       @returns {Object} An object of timings that can be used to infer browser render performance
       @example
       ```js
       it('should have loaded the page in less than two seconds', function () {
           expect(encore.rxMisc.getPerformanceMetrics('loadTime')).to.eventually.be.under(2000);
       });
       ```
     */
    getPerformanceMetrics: function (keys) {
        return browser.driver.executeScript(require('node-timing.js').getTimes).then(function (times) {
            if (_.isString(keys)) {
                return times[keys];
            } else if (_.isArray(keys)) {
                return _.pick(times, keys);
            } else {
                return times;
            }
        });
    },

    /**
     * Accepts an ElementArrayFinder, which can have several locations. Should the
     * list of elements be stacked vertically (say, in a list of table rows),
     * the element with the smallest Y coordinate will be scrolled to.
     * @function
     * @param {WebElement} elem An element, or a list of elements to scroll to
     * @returns {undefined}
     */
    scrollToElement: function (elem) {
        return elem.getLocation().then(function (loc) {
            if (_.isArray(loc)) {
                loc = _.min(loc, 'y');
            }

            var command = ['window.scrollTo(0, ', loc.y.toString(), ');'].join('');
            browser.executeScript(command);
        });
    },

    /**
     * @function
     * @param {WebElement} e1 First element to compare Y locations against.
     * @param {WebElement} e2 Second element to compare Y locations against.
     * @returns {Boolean} Whether or not `e1` and `e2` have the same Y coordinates.
     */
    compareYLocations: function (e1, e2) {
        return this.compareLocations(e1, e2, 'y');
    },

    /**
     * @function
     * @param {WebElement} e1 First element to compare X locations against.
     * @param {WebElement} e2 Second element to compare X locations against.
     * @returns {Boolean} Whether or not `e1` and `e2` have the same X coordinates.
     */
    compareXLocations: function (e1, e2) {
        return this.compareLocations(e1, e2, 'x');
    },

    /**
     * @function
     * @description
     * Unify input from either a location object or a web element into a promise
     * representing the location attribute (x or y) of either input.
     * Both `transformLocation($('.element'), 'y')` and `transformLocation({x: 20, y: 0}, 'y')`
     * return a promise representing the y value of the resulting (or provided) location object.
     */
    transformLocation: function (elementOrLocation, attribute) {
        if (_.isFunction(elementOrLocation.getLocation)) {
            var elem = elementOrLocation;
            return elem.getLocation().then(function (loc) {
                return loc[attribute];
            });
        } else {
            var location = elementOrLocation;
            if (_.has(location, attribute)) {
                return protractor.promise.fulfilled(location[attribute]);
            } else {
                return protractor.promise.fulfilled(location);
            }
        }
    },

    /**
     * @private
     * @function
     * @param {WebElement} e1 First element to compare locations against.
     * @param {WebElement} e2 Second element to compare locations against.
     * @param {String} attribute attribute to compare ('x' or 'y')
     */
    compareLocations: function (e1, e2, attribute) {
        var promises = [
            this.transformLocation(e1, attribute),
            this.transformLocation(e2, attribute)
        ];

        return protractor.promise.all(promises).then(function (locations) {
            return locations[0] === locations[1];
        });
    }
};
