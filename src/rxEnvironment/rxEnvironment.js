angular.module('encore.ui.rxEnvironment', ['ngSanitize'])
/**
*
* @ngdoc service
* @name encore.ui.rxEnvironment:Environment
* @description
* Allows defining environments and retrieving the current environment based on location
*
* @example
* <pre>
* Environment.get() // return environment object that matches current location
* </pre>
*/
.service('Environment', function ($location, $rootScope, $log) {
    var envSvc = {};

    /*
     * This array defined different environments to check against.
     * It is prefilled with 'Encore' based environments
     * It can be overwritten if necessary via the returned 'environments' property
     *
     * @property {string} name The 'friendly' name of the environment
     * @property {string|RegEx} pattern The pattern to match the current path against
     * @property {string} url The url pattern used to build out urls for that environment.
     *                        See 'buildUrl' for more details
     */

    var environments = [{
        // http://localhost:3000/
        // http://localhost:9000/
        // http://localhost/
        // http://server/
        name: 'local',
        pattern: /\/\/(localhost|server)(:\d{1,4})?/,
        url: '//localhost:' + $location.port() + '/{{path}}'
    }, {
        // https://staging.encore.rackspace.com/
        // https://preprod.encore.rackspace.com/
        name: 'unified-preprod',
        pattern: /\/\/(\w+\.)encore.rackspace.com/,
        url: '{{path}}'
    }, {
        // https://encore.rackspace.com/
        name: 'unified',
        pattern: 'encore.rackspace.com',
        url: '{{path}}'
    }, {
        // https://encore.rackspace.com/ only
        name: 'unified-prod',
        pattern: /\/\/(?=[\w.]+)encore.rackspace.com/,
        url: '{{path}}'
    }];

    /*
     * Checks if an environment has valid properties
     * @private
     * @param {object} environment The environment object to check
     * @returns {boolean} true if valid, false otherwise
     */
    var isValidEnvironment = function (environment) {
        var isValid =
            _.isString(environment.name) &&
            (_.isString(environment.pattern) || _.isRegExp(environment.pattern)) &&
            _.isString(environment.url);

        return isValid;
    };

    /*
     * Retrieves current environment
     * @public
     * @param {string} [href] The path to check the environment on. Defaults to $location.absUrl()
     * @returns {Object} The current environment (if found), else 'localhost' environment.
     */
    envSvc.get = function (href) {
        // default to current location if href not provided
        href = href || $location.absUrl();

        var currentEnvironment = _.find(environments, function (environment) {
            var pattern = environment.pattern;

            if (_.isRegExp(pattern)) {
                return pattern.test(href);
            }

            return _.contains(href, pattern);
        });

        if (_.isUndefined(currentEnvironment)) {
            $log.warn('No environments match URL: ' + $location.absUrl());
            // set to default/first environment to avoid errors
            currentEnvironment = environments[0];
        }

        return currentEnvironment;
    };

    /*
     * Adds an environment to the stack
     * @public
     * @param {object} environment The environment to add. See 'environments' array for required properties
     */
    envSvc.add = function (environment) {
        // do some sanity checks here
        if (isValidEnvironment(environment)) {
            // add environment
            environments.push(environment);
        } else {
            $log.error('Unable to add Environment: defined incorrectly');
        }
    };

    /*
     * Replaces current environments array with new one
     * @public
     * @param {array} newEnvironments New environments to use
     */
    envSvc.setAll = function (newEnvironments) {
        // validate that all new environments are valid
        if (newEnvironments.length > 0 && _.every(environments, isValidEnvironment)) {
            // overwrite old environments with new
            environments = newEnvironments;
        }
    };

    return envSvc;
})
/**
*
* @ngdoc filter
* @name encore.ui.rxEnvironment:rxEnvironmentUrl
* @description
* Builds a URL based on current environment.
* Note: if value passed in isn't an object, it will simply return that value
*
* @example
* <pre>
* {{ { tld: 'cloudatlas', path: 'cbs/servers' } | rxEnvironmentUrl }}
* Renders as '//staging.cloudatlas.encore.rackspace.com/cbs/servers' in staging
*
* {{ '/myPath' | rxEnvironmentUrl }}
* Renders as '/myPath' regardless of environment, because value passed in was not an object
* </pre>
*/
.filter('rxEnvironmentUrl', function (Environment, $interpolate) {
    return function (details) {
        var environment = Environment.get();

        // convert url template into full path based on details provided (if details is an object)
        var url = _.isObject(details) ? $interpolate(environment.url)(details) : details;

        return url;
    };
})
/**
*
* @ngdoc filter
* @name encore.ui.rxEnvironment:rxEnvironmentMatch
* @description
* Checks if current environment matches target environment
*
* @example
* <pre>
* {{ 'production' | rxEnvironmentMatch }}
* returns true if current environment is 'production', false otherwise
*
* {{ '!production' | rxEnvironmentMatch }}
* returns false if current environment is 'production', true otherwise
* </pre>
*/
.filter('rxEnvironmentMatch', function (Environment) {
    return function (environment) {
        // check to see if first character is negation indicator
        var isNegated = environment[0] === '!';

        // get name of environment to look for
        var targetEnvironmentName = isNegated ? environment.substr(1) : environment;

        // get name of current environment
        var currentEnvironmentName = Environment.get().name;

        if (isNegated) {
            return currentEnvironmentName !== targetEnvironmentName;
        } else {
            return currentEnvironmentName === targetEnvironmentName;
        }
    };
})
/**
* @ngdoc directive
* @name encore.ui.rxEnvironment:rxEnvironment
* @restrict A
* @description
* Show or hide content based on environment name
* @requires encore.ui.rxEnvironment:Environment
*
* @example
* <pre>
*     <div rx-if-environment="staging">Show if staging</div>
*     <div rx-if-environment="!production">Show if not prod</div>
* </pre>
*/
.directive('rxIfEnvironment', function ($compile) {
    return {
        restrict: 'A',
        terminal: true,
        priority: 1000,
        compile: function () {
            return {
                pre: function preLink (scope, element, attrs) {
                    // add ng-show attr to element
                    element.attr('ng-show', '\'' + attrs.rxIfEnvironment + '\'| rxEnvironmentMatch');

                    //remove the attribute to avoid an indefinite loop
                    element.removeAttr('rx-if-environment');
                    element.removeAttr('data-rx-if-environment');

                    // build the new element
                    $compile(element)(scope);
                }
            };
        }
    };
});
