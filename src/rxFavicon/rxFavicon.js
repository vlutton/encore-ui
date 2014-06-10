angular.module('encore.ui.rxFavicon', ['encore.ui.rxEnvironment'])
.directive('rxFavicon', function (Environment, $parse) {
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, el, attrs) {
            var favicons = $parse(attrs.rxFavicon)(scope) || { };

            // fallbacks in case staging/local isn't defined
            favicons.prod = el.attr('href');
            favicons.staging = favicons.staging || favicons.prod;
            favicons.local = favicons.local || favicons.staging;

            // convert environment name to match scope variables
            var environmentMap = {
                'local': 'local',
                'unified-preprod': 'staging',
                'ghPages': 'prod',
                'unified-prod': 'prod'
            };

            scope.$watch(function () {
                return Environment.get();
            }, function (environment) {
                var currentEnv = environmentMap[environment.name];

                // update href to use new path
                el.attr('href', favicons[currentEnv]);
            });
        }
    };
});