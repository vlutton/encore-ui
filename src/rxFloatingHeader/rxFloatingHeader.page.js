/*jshint node:true*/
var _ = require('lodash');

/**
   @exports encore.rxFloatingHeader
 */
exports.rxFloatingHeader = {

    /**
       Accepts an ElementArrayFinder, which can have several locations. Should the
       list of elements be stacked vertically (say, in a list of table rows),
       the element with the smallest Y coordinate will be scrolled to.
       @function
       @param {WebElement} elem - An element, or a list of elements to scroll to
       @returns {undefined}
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
       @function
       @param {WebElement} e1 - First element to compare Y locations against.
       @param {WebElement} e2 - Second element to compare Y locations against.
       @returns {Boolean} Whether or not `e1` and `e2` have the same Y coordinates.
     */
    compareYLocations: function (e1, e2) {
        return this.compareLocations(e1, e2, 'y');
    },

    /**
       @function
       @param {WebElement} e1 - First element to compare X locations against.
       @param {WebElement} e2 - Second element to compare X locations against.
       @returns {Boolean} Whether or not `e1` and `e2` have the same X coordinates.
    */
    compareXLocations: function (e1, e2) {
        return this.compareLocations(e1, e2, 'x');
    },

    /**
      Unify input from either a location object or a web element into a promise
      representing the location attribute (x or y) of either input.
      Both `transformLocation($('.element'), 'y')` and `transformLocation({x: 20, y: 0}, 'y')`
      return a promise representing the y value of the resulting (or provided) location object.
      @private
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
       @private
     */
    compareLocations: function (e1, e2, attribute) {
        var promises = [this.transformLocation(e1, attribute), this.transformLocation(e2, attribute)];
        return protractor.promise.all(promises).then(function (locations) {
            return locations[0] === locations[1];
        });
    }

};
