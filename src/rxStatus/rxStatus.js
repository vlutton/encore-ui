angular.module('encore.ui.rxStatus', ['encore.ui.rxNotify'])
/**
* @ngdoc service
* @name encore.ui.rxStatus:StatusUtil
* @description
* Manipulates references to needed $scope input for proper notification functionality
*
* @example
* <pre>
*   $rootScope.$on('$routeChangeSuccess', function () {
*       Status.setScope(); // no input results in $rootScope being used
*       Status.setUtil($rootScope); // forcibly set $rootScope as the scope to be used
*   });
* </pre>
*/
    .service('StatusUtil', function ($route, $rootScope, Status) {
        return {
            setupScope: function (scope) {
                Status.setScope(scope || $rootScope);
            }
        };
    })
/**
* @ngdoc service
* @name encore.ui.rxStatus:Status
* @description
* Manages notifications for rxNotify with an abstracted set of functions for ease of use
*/
    .service('Status', function ($rootScope, rxNotify, ErrorFormatter) {
        var stack = 'page';
        var scope;
        var status = {
            LOADING: function () {
                return { loaded: false, loading: true, prop: 'loaded' };
            },
            SUCCESS: function () {
                return { loaded: true, loading: false, success: true, type: 'success', prop: 'loaded' };
            },
            ERROR: function () {
                return { loaded: true, loading: false, success: false, type: 'error', prop: 'loaded' };
            },
            WARNING: function () {
                return { loaded: true, loading: false, success: true, type: 'warning', prop: 'loaded' };
            },
            INFO: function () {
                return { loaded: true, loading: false, success: true, type: 'info', prop: 'loaded' };
            },
            CLEAR: function () {
                return { loading: false, prop: 'loaded' };
            },
        };

        // States that specify a type cannot be dismissed (have to be approved by user)
        var isDismissable = function (state) {
            return _.has(state, 'loading') && !_.has(state, 'type');
        };

        // Given an options object, check if scope[options.prop] exists,
        // and set it to `val` if so. `val` defaults to true if not
        // supplied
        var setDoneLoadingProp = function (options, val) {
            val = _.isUndefined(val) ? true : val;
            if (_.has(options, 'prop') && _.has(scope, options.prop)) {
                scope[options.prop] = val;
            }
        };

        // If the stack is overridden in a given controller, it needs to be refreshed
        // for any subsequent controllers since a Service is loaded by Angular only once
        $rootScope.$on('$routeChangeStart', function () {
            status.setStack('page');
        });

        status.setStack = function (s) {
            stack = s;
        };

        status.setScope = function ($scope) {
            scope = $scope;
            scope.loaded = false;
        };

        status.setStatus = function (msg, state) {
            state.stack = stack;

            if (isDismissable(state)) {
                // state.prop defaults to 'loaded', per status.LOADING
                state.dismiss = [scope, state.prop];
            }

            if (state.type === 'success') {
                state.show = state.show || 'next';
            }

            setDoneLoadingProp(state, _.has(state, 'loading') ? !state.loading : true);
            scope.status = state;
            return rxNotify.add(msg, state);
        };

        status.setLoading = function (msg, options) {
            options = _.merge(status.LOADING(), options ? options : {});

            // prop is the variable on scope that stores whether this loading is complete
            // By default is uses $scope.loaded, but individual messages should be able to
            // use their own property
            var prop = options.prop;
            scope[prop] = false;
            return status.setStatus(msg || '', options);
        };

        status.setSuccess = function (msg, options) {
            options = _.merge(status.SUCCESS(), options ? options : {});
            return status.setStatus(msg || '', options);
        };

        status.setSuccessNext = function (msg, options) {
            var next = { 'show': 'next' };
            options = _.merge(next, options);
            return status.setSuccess(msg, options);
        };

        status.setSuccessImmediate = function (msg, options) {
            var immediate = { 'show': 'immediate' };
            options = _.merge(immediate, options);
            return status.setSuccess(msg, options);
        };

        status.setWarning = function (msg, options) {
            options = _.merge(status.WARNING(), options ? options : {});
            return status.setStatus(msg, options);
        };

        status.setInfo = function (msg, options) {
            options = _.merge(status.INFO(), options ? options : {});
            return status.setStatus(msg, options);
        };

        /*
         * `msg` - can be a plain string, or it can be a string template with ${message} in it
         * `error` - An optional error object. Should have a `message` or `statusText` property
         * `options` - A usual options object
         */
        status.setError = function (msg, error, options) {
            options = _.merge(status.ERROR(), options ? options : {});
            msg = ErrorFormatter.buildErrorMsg(msg || '', error);
            return status.setStatus(msg, options);
        };

        status.complete = function (options) {
            options = options || {};
            return status.setSuccessImmediate('', _.merge(status.SUCCESS(), options));
        };

        status.dismiss = function (obj) {
            scope.status = status.CLEAR();
            return rxNotify.dismiss(obj);
        };

        status.clear = function (st) {
            scope.status = status.CLEAR();
            return rxNotify.clear(st || stack);
        };

        return status;
    })
/**
* @ngdoc service 
* @name encore.ui.rxStatus:ErrorFormatter
* @description
* Provides a helper method to parse error objects for 'message' and format them
* as necessary for Status.setError()
*/
    .factory('ErrorFormatter', function () {
        /*
         * formatString is a string with ${message} in it somewhere, where ${message}
         * will come from the `error` object. The `error` object either needs to have
         * a `message` property, or a `statusText` property.
         */
        var buildErrorMsg = function (formatString, error) {
            error = error || {};
            if (!_.has(error, 'message')) {
                error.message = _.has(error, 'statusText') ? error.statusText : 'Unknown error';
            }
            return _.template(formatString, error);
        };

        return {
            buildErrorMsg: buildErrorMsg
        };
    });
