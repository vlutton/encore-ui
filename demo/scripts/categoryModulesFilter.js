angular.module('demoApp')
/**
 * @ngdoc filter
 * @name demoApp:categoryModulesFilter
 * @description
 * Used to filter module list. Given a string, filter checks for the following case insensitive conditions:
 *  - input string matches any part of module name value
 *  - input string matches begining of stability value
 *
 * @param {Array} modules list of modules to be filtered
 * @param {String} search input string to filter list by
 */
.filter('categoryModulesFilter', function () {
    var prevSearch = '';

    return function (modules, search) {
        if (!search) {
            return modules;
        }

        // build case-insensitive, regular expression from search term
        var searchRegExp = new RegExp(search, 'i');

        function matchesName (mod) {
            return mod.name.match(searchRegExp);
        }

        function matchesDisplayName (mod) {
            return mod.displayName.match(searchRegExp);
        }

        function matchesStability (mod) {
            return mod.stability.match(searchRegExp);
        }

        return _.filter(modules, function (mod) {
            return matchesDisplayName(mod) || matchesStability(mod);
        });
    };
});
