// Note that these two factories are only present for the purposes of this demo. In a real application,
// both SupportAccount and Encore will have to be provided from elsewhere, outside of encore-ui

angular.module('encore.ui.rxAccountInfo')
.value('Badges',
    [
        {
            url: 'http://mirrors.creativecommons.org/presskit/icons/cc.large.png',
            description: 'Enables the free distribution of an otherwise copyrighted work.',
            name: 'Creative Commons'
        }, {
            url: 'http://mirrors.creativecommons.org/presskit/icons/by.large.png',
            description: ['You must give appropriate credit, provide a link to the',
                          'license, and indicate if changes were made.'].join(' '),
            name: 'Attribution'
        }, {
            url: 'http://mirrors.creativecommons.org/presskit/icons/nc.large.png',
            description: 'You may not use the material for commercial purposes.',
            name: 'Non-Commercial'
        }, {
            url: 'http://mirrors.creativecommons.org/presskit/icons/zero.large.png',
            description: 'Waives as many rights as legally possible, worldwide.',
            name: 'Public Domain'
        }
    ]
)
.value('TeamBadges',
    [
        {
            url: 'http://mirrors.creativecommons.org/presskit/icons/share.large.png',
            description: ['Licensees may distribute derivative works only under a license',
                          'identical to the license that governs the original work.'].join(' '),
            name: 'ShareAlike'
        }, {
            url: 'http://mirrors.creativecommons.org/presskit/icons/nd.large.png',
            description: ['Licensees may copy, distribute, display and perform only verbatim',
                          'copies of the work, not derivative works based on it.'].join(' '),
            name: 'No-Derivs'
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
.factory('Teams', function ($q, TeamBadges) {
    return {
        badges: function (config) {
            var deferred = $q.defer();

            if (config.id === '9876') {
                deferred.reject();
            } else {
                deferred.resolve(TeamBadges);
            }

            deferred.$promise = deferred.promise;

            return deferred;
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
