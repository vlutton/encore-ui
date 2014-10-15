// Note that these two factories are only present for the purposes of this demo. In a real application,
// both SupportAccount and Encore will have to be provided from elsewhere, outside of encore-ui

angular.module('encore.ui.rxAccountInfo')
.value('Badges',
    [
        {
            url: 'http://mirrors.creativecommons.org/presskit/icons/cc.large.png',
            description: 'CC'
        }, {
            url: 'http://mirrors.creativecommons.org/presskit/icons/by.large.png',
            description: 'BY'
        }, {
            url: 'http://mirrors.creativecommons.org/presskit/icons/nc.large.png',
            description: 'NC',
        }, {
            url: 'http://mirrors.creativecommons.org/presskit/icons/zero.large.png',
            description: 'ZERO',
        }
    ]
)
.factory('SupportAccount', function ($q, Badges) {
    return {
        getBadges: function (config, success, failure) {
            var deferred = $q.defer();

            if (config.accountNumber === '6789') {
                deferred.reject();
            } else {
                deferred.resolve(Badges);
            }

            deferred.promise.then(success, failure);

            return deferred.promise;
        }
    };
})
.factory('Encore', function ($q) {
    return {
        getAccount: function (config, success, failure) {
            var deferred = $q.defer();

            if (config.id === '9876') {
                deferred.reject();
            } else {
                deferred.resolve({ name: 'Mosso' });
            }

            deferred.promise.then(success, failure);

            return deferred.promise;
        }
    };
});
