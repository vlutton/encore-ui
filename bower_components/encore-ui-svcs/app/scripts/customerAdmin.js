angular.module('encore.svcs.customerAdmin', ['ngResource', 'encore.util.transform'])
   /**
    * @ngdoc service
    * @name encore.svcs.customerAdminSvcs:Account
    * @description
    * Account Service for interaction with CAS API
    *
    * @requires $resource - AngularJS service to extend the $http and wrap AJAX calls to API's.
    */
    .factory('Account', function ($resource) {
        return $resource('/api/customer-admin/customer_accounts/:type/:accountNumber',
            {
                accountNumber: '@accountNumber',
                type: '@type'
            },
            {
                get: {
                    cache: true,
                    params: {
                        type: 'CLOUD'
                    }
                }
            });
    })
    /**
    * @ngdoc service
    * @name encore.svcs.customerAdminSvcs:Contact
    * @description
    * Contact Service for interaction with CAS API
    *
    * @requires $resource - AngularJS service to extend the $http and wrap AJAX calls to API's.
    */
    .factory('Contact', function ($resource, Pluck) {
        var transformList = Pluck('contact');
        return $resource('/api/customer-admin/customer_accounts/:type/:accountNumber/contacts',
            {
                accountNumber: '@accountNumber',
            },
            {
                list: {
                    method: 'GET',
                    isArray: true,
                    transformResponse: transformList,
                    params: {
                        type: 'CLOUD',
                        marker: 1,
                        limit: 10
                    }
                }
            }
        );
    });
