angular.module('encore.ui.rxDiskSize', [])
.filter('rxDiskSize', function () {
    return function (size) {
        var units = ['GB', 'TB', 'PB'];
        var unit = Math.floor(Math.log(size) / Math.log(1000));

        return size / Math.pow(1000, Math.floor(unit)).toFixed(1) + ' ' + units[unit];
    };
});
