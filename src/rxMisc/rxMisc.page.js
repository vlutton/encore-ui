/*jshint node:true*/

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
     * Angular's 'currency' filter. If your currency string includes fractions of a penny,
     * that precision will be lost!
     * @param {string} currencyString - Raw text as output by Angular's `currency` filter.
     *
     * @example
     * ```js
     * encore.rxMisc.currencyToPennies('$0.01')      ==  1
     * encore.rxMisc.currencyToPennies('$0.019')     ==  1
     * encore.rxMisc.currencyToPennies('$100 CAN')   ==  10000
     * encore.rxMisc.currencyToPennies('($100 AUS)') == -10000
     * encore.rxMisc.currencyToPennies('($1.011)')   == -101
     * encore.rxMisc.currencyToPennies('$1.10')      ==  110
     * ```
     */
    currencyToPennies: function (currencyString) {
        var resFloat = parseFloat(currencyString.split(' ')[0].replace(/[,$()]/g, '').trim());

        // Negative number
        if (currencyString.indexOf('(') > -1 && currencyString.indexOf(')') > -1) {
            resFloat = -resFloat;
        }

        return parseInt(resFloat * 100, 10);
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
       @param {Function} innerFn - Function to call on the element should it be present, displayed, and valid.
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
    }
};
