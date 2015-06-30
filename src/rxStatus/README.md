[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

# Description

This service is provided as a compliment to [`rxNotify` rxNotify service](#/component/rxNotify).  It abstracts out some of the raw functionality provided by rxNotify to make the addition and removal of single messages easier.

# Usage

## Preparation

In order to use the `Status` service, one has to instantiate it with a proper `$scope` object to keep track of a running state.  `rxNotify` indirectly makes use of the `$scope` variable when a message can be auto-dismissed.  In order to keep the interface for the wrapper functions coherent, the `$scope` variable must be provided before use.  This can be accomplished as follows:

        Status.setupScope($scope);

## Success cases

The `Status` service is provided as a wrapper to rxNotify.  As such, the status types supported by `rxNotify` are still used and have been wrapped into utility functions.  For example, on page load it is usually necessary to inform the user of pending data retrieval.  This can be accomplished by:

        Status.setLoading('Retrieving users');

This will call rxNotify in the following manner:

        rxNotify.add('Retrieving users', {
            stack: 'page',
            dismiss: [scope, 'loaded'],
            loading: true
        });

Similarly, the following call using the Status service:

        Status.setSuccess('Successfully deleted questionable ' +
            'browsing history');

results in a call to rxNotify as such:

        rxNotify.add('Successfully deleted questionable ' +
            'browsing history',
            {
                stack: 'page',
                show: 'next'
            }
        );

Note: For `success` and `error` messages, the `repeat` attribute is set to false. Messages of `success` will also automatically timeout after 5 seconds. Both of these defaults were design decisions made at this level for usability and consistency across all Encore products.

Each of the wrapper functions to the different rxNotify message types support receiving an `options:{}` parameter that can override defaults for the respective wrapper. For example, instead of showing a success message on next route change, it can be shown immediately:

        Status.setSuccess('Please show immediately', {
            show: 'immediate'
        });

Please note that the `options` are of the same type as one would provide to rxNotify.  This should allow for maximum flexibility when necessary.  However, as a bonus, some common behaviours expected to be overriden have been provided as their own wrapper functions.  For example:

        Status.setSuccessImmediate('Please show immediately')

is the equivalent of calling `Status.setSuccess()` with the `{ show: 'immediate' }` parameter.  Please note, there isn't much fault checking in place, so the following behaviour although permitted, is not advised:

        Status.setSuccessImmediate('Please show immediately', {
            show: 'next'
        });

## Error cases

The `{ type: 'error' }` wrapper is a unique one.  It allows for a string to be passed as an error message, just like the wrappers before.  For example:

        Status.setError('This is an error!');


It also allows for a specialized template to be specified as the error string with an `object:{}` as the second parameter containing the replacements for the template in the error string.  If in a proper format, the object can be automatically parsed using an `ErrorFormatter` and displayed to the user.  For example:

        Status.setError(
            'Failed loading browsing history: ${message}',
            { message: 'User has previously cleared their history!' }
        );

Please note that the replacement variable `${message}` in the error string maps one-to-one to the keys provided in the the error object.  One can specify any number of template variables to replace.  Not providing a balanced list of variables and their replacements will result in a `ReferenceError: <replacement> is not defined`.

The following wrapper functions are available today.  Their names should be self explanatory:

 * setLoading
 * setSuccess
 * setSuccessNext
 * setSuccessImmediate
 * setWarning
 * setInfo
 * setError
 * complete &rarr; setSuccessImmediate

The following are used to programmatically remove notifications from the screen:

 * dismiss
 * clear

# Utilities

The `Status` service requires that one provide a `$scope` object to keep tracking of state before any of the wrapper functions can be utilized.  Since it is expected that almost all pages will make use of notifications, one can place the repeated setup of the `Status` service in a page load event handler.  This will allow all pages to gain an already setup `Status` service for immediate use.  For example:

        .run(function ($rootScope, StatusUtil) {
            $rootScope.$on('$routeChangeSuccess', function () {
                Status.setupScope($rootScope);
            });
        });

Although hidden away in the app's bootstrap code, the above makes for a less repetitive call to `Status.setScope()` at the beginning of each use.
