/*jshint unused:false*/
function rxEnvironmentCtrl ($scope, Environment) {
    Environment.add({
        name: 'ghPages',
        pattern: '//rackerlabs.github.io/encore-ui/',
        url: '//rackerlabs.github.io/encore-ui/{{path}}'
    });

    $scope.switchTo = function (envName) {
        Environment.set(envName);
    };
}