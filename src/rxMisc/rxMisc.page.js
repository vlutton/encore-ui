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
    }
};
