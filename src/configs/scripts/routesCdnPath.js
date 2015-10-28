angular.module('encore.ui.configs')
/**
 * @ngdoc service
 * @name configs.service:routesCdnPath
 * @description [TBD]
 */
.provider('routesCdnPath', function () {
    this.customURL = null;

    this.$get = function () {
        var staging = this.customURL ||
            'https://5593626d69acc4cdb66a-521ce2b7cdb9308893eabb7915d88c0c.ssl.cf1.rackcdn.com/encoreNav.json';

        var production =
            'https://d5b31243886503cdda55-92f888f8ef3e8464bcb65f52330fcbfb.ssl.cf1.rackcdn.com/encoreNav.json';

        var preprod =
            'https://b24ad15095637d2f91ee-ae6903de16cd565a74a9a50d287ad33f.ssl.cf1.rackcdn.com/encoreNav.json';

        return {
            production: production,
            staging: staging,
            preprod: preprod,
            hasCustomURL: !_.isEmpty(this.customURL)
        };
    };
});
