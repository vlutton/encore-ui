angular.module('encore.ui.rxAccountInfo', [])
.directive('rxAccountInfo', function (SupportAccount, Encore, rxNotify) {
    return {
        templateUrl: 'templates/rxAccountInfo.html',
        restrict: 'E',
        scope: {
            accountNumber: '@',
            notifyStack: '@'
        },
        link: function (scope) {
            var notifyStack = scope.notifyStack || 'page';

            SupportAccount.getBadges({ accountNumber: scope.accountNumber }, function (badges) {
                scope.badges = badges;
            }, function () {
                rxNotify.add('Error retrieving badges for this account', {
                    type: 'error',
                    stack: notifyStack
                });
            });

            Encore.getAccount({ id: scope.accountNumber }, function (account) {
                scope.accountName = account.name;
            }, function () {
                rxNotify.add('Error retrieving account name', {
                    type: 'error',
                    stack: notifyStack
                });
            });
            
        }
    };
});
