/*jshint unused:false*/
function rxEnvironmentCtrl ($scope, Environment) {
    $scope.Environment = Environment;

    Environment.add({
        name: 'ghPages',
        pattern: '//rackerlabs.github.io/encore-ui',
        url: '//rackerlabs.github.io/encore-ui/{{path}}'
    });
}