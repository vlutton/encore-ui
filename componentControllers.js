// this loads all the component controllers used in the demos





/*jshint unused:false*/
function hotkeysCtrl ($scope, hotkeys) {
    $scope.volume = 5;

    hotkeys.add({
        combo: 'ctrl+up',
        description: 'Turn up the volume!',
        callback: function () {
            $scope.volume += 1;
        }
    });

    hotkeys.add({
        combo: 'ctrl+down',
        description: 'Turn it down!',
        callback: function () {
            $scope.volume -= 1;
        }
    });

    var showHFSHE = function () {
        var videoSrc = '//www.youtube.com/embed/Dach1nPbsY8?autoplay=1';

        var iframe = document.createElement('iframe');
        iframe.src = videoSrc;

        var container = document.getElementById('hfshe');
        container.appendChild(iframe);
        container.style.display = 'block';
    };

    hotkeys.add({
        combo: 'up+up+down+down+left+right+left+right+a+b',
        callback: showHFSHE
    });
}




/*jshint unused:false*/

// This file is used to help build the 'demo' documentation page and should be updated with example code
function progressbarCtrl ($scope) {

}


// Note that these factories are only present for the purposes of this demo. In a real application,
// SupportAccount, Teams, AccountStatusGroup, and Encore will have to be provided from elsewhere,
// outside of encore-ui. Specifically, we implement them in encore-ui-svcs

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
            } else if (config.id === '5623') {
                deferred.resolve({ name: 'DelinquentAccount', status: 'Delinquent' });
            } else if (config.id === '3265') {
                deferred.resolve({ name: 'UnverifiedAccount', status: 'Unverified' });
            } else {
                deferred.resolve({ name: 'Mosso', status: 'Active' });
            }

            deferred.promise.then(success, failure);

            return deferred.promise;
        }
    };
})
.factory('AccountStatusGroup', function () {
    var warning = ['suspended', 'delinquent'];
    var info = ['unverified', 'pending approval', 'approval denied', 'teststatus', 'terminated'];

    return function (statusText) {
        var lower = statusText.toLowerCase();
        if (_.contains(warning, lower)) {
            return 'warning';
        } else if (_.contains(info, lower)) {
            return 'info';
        }
        return '';
    };
})
.controller('rxAccountInfoDemo', function ($scope) {
        $scope.customMenu = [{
            title: 'Example Menu',
            children: [
                {
                    href: 'Lvl1-1',
                    linkText: '1st Order Item'
                },
                {
                    linkText: '1st Order Item (w/o href) w/ Children',
                    childVisibility: [ 'isUserDefined' ],
                    childHeader: '<strong class="current-search">Current User:</strong>' +
                                 '<span class="current-result">{{$root.user}}</span>',
                    children: [
                        {
                            href: 'Lvl1-2-Lvl2-1',
                            linkText: '2nd Order Item w/ Children',
                            children: [{
                                href: 'Lvl1-2-Lvl2-1-Lvl3-1',
                                linkText: '3rd Order Item'
                            }]
                        },
                        {
                            href: 'Lvl1-2-Lvl2-2',
                            linkText: '2nd Order Item w/ Children',
                            children: [
                                {
                                    href: 'Lvl1-2-Lvl2-2-Lvl3-1',
                                    linkText: '3rd Order Item'
                                },
                                {
                                    href: 'Lvl1-2-Lvl2-2-Lvl3-2',
                                    linkText: '3rd Order Item'
                                },
                                {
                                    href: 'Lvl1-2-Lvl2-2-Lvl3-3',
                                    linkText: '3rd Order Item'
                                },
                                {
                                    href: 'Lvl1-2-Lvl2-2-Lvl3-4',
                                    linkText: '3rd Order Item'
                                }
                            ]
                        },
                        {
                            href: 'Lvl1-2-Lvl2-3',
                            linkText: '2nd Order Item'
                        }
                    ]
                },
                {
                    href: 'Lvl1-3',
                    linkText: '1st Order Item w/ Children',
                    children: [
                        {
                            href: 'Lvl1-3-Lvl2-1',
                            linkText: '2nd Order Item'
                        }
                    ]
                }
            ]
        }];
    });


/*jshint unused:false*/
function rxActionMenuCtrl ($scope, rxNotify) {

    $scope.add = function () {
        rxNotify.add('Added!', {
            type: 'success',
            repeat: false,
            timeout: 3
        });
    };

    $scope.remove = function () {
        rxNotify.add('Deleted!', {
            type: 'error',
            repeat: false,
            timeout: 3
        });
    };

}




/*jshint unused:false*/

// This file is used to help build the 'demo' documentation page and should be updated with example code
function rxAgeCtrl ($scope) {
    var day = 1000 * 60 * 60 * 24;
    $scope.ageHours = new Date((Date.now() - (day / 2.3))).toString();
    $scope.ageDays = new Date((Date.now() - (day * 1.5))).toString();
    $scope.ageMonths = new Date((Date.now() - (day * 40.2))).toString();
    $scope.ageYears = new Date((Date.now() - (day * 380.1))).toString();
}


/*jshint unused:false*/
function rxAppCtrl ($scope, $location, $rootScope, $window, encoreRoutes, rxVisibility) {
    $scope.subtitle = 'With a subtitle';

    $scope.changeSubtitle = function () {
        $scope.subtitle = 'With a new subtitle at ' + Date.now();
    };

    rxVisibility.addMethod(
        'isUserDefined',
        function (scope, locals) {
            return !_.isEmpty($rootScope.user);
        }
    );

    $scope.changeRoutes = function () {
        var newRoute = {
            linkText: 'Updated Route',
            childVisibility: 'true',
            children: [
                {
                    linkText: 'New child route'
                }
            ]
        };

        encoreRoutes.setRouteByKey('accountLvlTools', newRoute);
    };

    // Fake navigation
    var customApp = document.getElementById('custom-rxApp');
    customApp.addEventListener('click', function (ev) {
        var target = ev.target;

        if (target.className.indexOf('item-link') > -1) {
            // prevent the default jump to top
            ev.preventDefault();

            var href = target.getAttribute('href');

            // update angular location (if href has a value)
            if (!_.isEmpty(href)) {
                // we need to prevent the window from scrolling (the demo does this)
                // so we get the current scrollTop position
                // and set it after the demo page has run '$routeChangeSuccess'
                var currentScollTop = document.body.scrollTop;

                $location.hash(href);

                $rootScope.$apply();

                $window.scrollTo(0, currentScollTop);
            }
        }
    });

    var searchDirective = 'rx-app-search placeholder="Enter User" model="$root.user" pattern="/^([0-9a-zA-Z._ -]{2,})$/"';

    $scope.customMenu = [{
        title: 'Example Menu',
        children: [
            {
                href: 'Lvl1-1',
                linkText: '1st Order Item'
            },
            {
                linkText: '1st Order Item (w/o href) w/ Children',
                childVisibility: [ 'isUserDefined' ],
                childHeader: '<strong class="current-search">Current User:</strong>' +
                             '<span class="current-result">{{$root.user}}</span>',
                directive: searchDirective,
                children: [
                    {
                        href: 'Lvl1-2-Lvl2-1',
                        linkText: '2nd Order Item w/ Children',
                        children: [{
                            href: 'Lvl1-2-Lvl2-1-Lvl3-1',
                            linkText: '3rd Order Item'
                        }]
                    },
                    {
                        href: 'Lvl1-2-Lvl2-2',
                        linkText: '2nd Order Item w/ Children',
                        children: [
                            {
                                href: 'Lvl1-2-Lvl2-2-Lvl3-1',
                                linkText: '3rd Order Item'
                            },
                            {
                                href: 'Lvl1-2-Lvl2-2-Lvl3-2',
                                linkText: '3rd Order Item'
                            },
                            {
                                href: 'Lvl1-2-Lvl2-2-Lvl3-3',
                                linkText: '3rd Order Item'
                            },
                            {
                                href: 'Lvl1-2-Lvl2-2-Lvl3-4',
                                linkText: '3rd Order Item'
                            }
                        ]
                    },
                    {
                        href: 'Lvl1-2-Lvl2-3',
                        linkText: '2nd Order Item'
                    }
                ]
            },
            {
                href: 'Lvl1-3',
                linkText: '1st Order Item w/ Children',
                children: [
                    {
                        href: 'Lvl1-3-Lvl2-1',
                        linkText: '2nd Order Item'
                    }
                ]
            }
        ]
    }];
}




/*jshint unused:false*/
function rxAttributesCtrl ($scope) {
    $scope.customStyles = 'color: red; font-weight: bold;';
    $scope.customContent = '"Custom Content"';
}


function rxAuthCtrl ($scope, Auth) {
    $scope.hasRole = function () {
        alert('Has "superhero" Role? : ' + Auth.hasRole('superhero'));
    };

    $scope.isAuthenticated = function () {
        alert('Is Authenticated? : ' + Auth.isAuthenticated());
    };
}


/*jshint unused:false*/
function rxBreadcrumbsCtrl ($scope, rxBreadcrumbsSvc) {
    rxBreadcrumbsSvc.set([{
        path: '/',
        name: 'Components',
    }, {
        name: '<strong>All Components</strong>',
        status: 'demo'
    }]);
}


/*jshint unused:false*/
function rxButtonCtrl ($scope, $timeout) {
    $scope.status = {
        loading: false,
        disable: true
    };

    $scope.login = function () {
        $scope.status.loading = true;

        $timeout(function () {
            $scope.status.loading = false;
        }, 4000);
    };
}


/*jshint unused:false*/

function rxCapitalizeCtrl ($scope) {
    $scope.hello = 'hello world. this is my text';
}


/*jshint unused:false*/

// This file is used to help build the 'demo' documentation page and should be updated with example code
function rxCharacterCountCtrl ($scope) {
    $scope.data = {
        comment1: '',
        comment2: '',
        comment3: '',
        comment4: '',
        comment5: 'I have an initial value'
    };
}


/*jshint unused:false*/

// This file is used to help build the 'demo' documentation page and should be updated with example code
function rxCompileCtrl ($scope) {
    $scope.world = 'wrrrld';
    $scope.myExpression = 'Hello {{world}}';
}


/*jshint unused:false*/

// This file is used to help build the 'demo' documentation page and should be updated with example code
function rxDiskSizeCtrl ($scope) {
    $scope.sizeGB = 420;
    $scope.sizeTB = 125000;
    $scope.sizePB = 171337000;
}


/*jshint unused:false*/
function rxEnvironmentCtrl ($scope, Environment) {
    $scope.Environment = Environment;
}


/*jshint unused:false*/
function rxFaviconCtrl ($scope, Environment) {
    $scope.setEnvironment = function (environment) {
        // TODO allow overriding the current environment to show how the favicon changes
    };
}


/*jshint unused:false*/
function rxFeedbackCtrl ($scope, rxNotify) {
    $scope.alwaysSucceed = function () {
        rxNotify.add('Thanks for your feedback!', {
            type: 'success',
            timeout: 3
        });
    };

    $scope.alwaysFail = function () {
        rxNotify.add('Feedback not received!', {
            type: 'error',
            timeout: 3
        });
    };
}


/*jshint unused:false*/

// This file is used to help build the 'demo' documentation page and should be updated with example code
function rxFloatingHeaderCtrl ($scope) {
    $scope.searchText = '';
    $scope.data = [
        { name: 'A', value: 1 },
        { name: 'B', value: 2 },
        { name: 'C', value: 3 },
        { name: 'D', value: 4 },
        { name: 'E', value: 5 },
        { name: 'First', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'F', value: 1 },
        { name: 'G', value: 2 },
        { name: 'H', value: 3 },
        { name: 'I', value: 4 },
        { name: 'J', value: 5 },
        { name: 'K', value: 1 },
        { name: 'L', value: 2 },
    ];

    $scope.clearFilter = function () {
        $scope.searchText = '';
    };

}


function rxFormDemoCtrl ($scope) {
    $scope.types = [
        {
            'value': 'SATA',
            'label': 'SATA'
        },
        {
            'value': 'SSD',
            'label': 'SSD'
        },
        {
            'value': 'CD',
            'label': 'CD'
        },
        {
            'value': 'DVD',
            'label': 'DVD'
        },
        {
            'value': 'BLURAY',
            'label': 'BLURAY'
        },
        {
            'value': 'TAPE',
            'label': 'TAPE'
        },
        {
            'value': 'FLOPPY',
            'label': 'FLOPPY'
        },
        {
            'value': 'LASERDISC',
            'label': 'LASERDISC'
        },
        {
            'value': 'JAZDRIVE',
            'label': 'JAZDRIVE'
        },
        {
            'value': 'PUNCHCARDS',
            'label': 'PUNCHCARDS'
        },
        {
            'value': 'RNA',
            'label': 'RNA'
        }
    ];

    $scope.volume = {
        data: 0,
        isNameRequired: true,
        type: _.first($scope.types).value, // select the first type by default
        checked: [true, 'unchecked'] //example with first checkbox automatically checked
    };

    $scope.yesOptionDescription = '<b>This</b> is HTML that included in the JS';

    $scope.optionTableData = [
        {
            'id': 'option1_id',
            'name': 'Option #1',
            'value': 0,
            'obj': {
                'name': 'Nested Name 1'
            }
        }, {
            'id': 'option2_id',
            'name': 'Option #2',
            'value': 1,
            'obj': {
                'name': 'Nested Name 2'
            }
        }, {
            'id': 'option3_id',
            'name': 'Option #3',
            'value': 2,
            'obj': {
                'name': 'Nested Name 3'
            }
        }, {
            'id': 'option4_id',
            'name': 'Option #4',
            'value': 3,
            'obj': {
                'name': 'Nested Name 4'
            }
        }
    ];

    $scope.optionTableColumns = [{
        'label': 'Name',
        'key': 'name',
        'selectedLabel': '(Already saved data)'
    }, {
        'label': 'Static Content',
        'key': 'Some <strong>Text &</strong> HTML'
    }, {
        'label': 'Expression 2',
        'key': '{{ value * 100 | number:2 }}'
    }, {
        'label': 'Expression 3',
        'key': '{{ obj.name | uppercase }}'
    }, {
        'label': 'Expression 4',
        'key': '{{ value | currency }}'
    }];

    $scope.optionTableCheckboxData = [{
        'name': 'Item 1'
    }, {
        'name': 'Item 2',
        'value': 'checked',
        'falseValue': 'unchecked'
    }];

    $scope.optionTableEmptyData = [];

    $scope.compressedLayout = { value: false };

    $scope.details = { email: '' };

    $scope.disableOption = function (tableId, fieldId, rowId) {
        return rowId === 'option4_id';
    };

}

// A dummy directive only used within the rxForm demo page.
// It's used to check that some string contains 'foo', and works
// with ngForm to set the appropriate `.$error` value
// Note: This code is easier to write in Angular 1.3, because
// you can use `.$validators` instead of `.$parsers`
angular.module('encore.ui.rxForm')
.directive('foocheck', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {

            // Put a new validator on the beginning
            ctrl.$parsers.unshift(function (viewValue) {
                if (_.contains(viewValue, 'foo')) {
                    ctrl.$setValidity('foocheck', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('foocheck', false);
                    return undefined;
                }
            });
        }
    };

});


/*jshint unused:false*/
function rxIdentityCtrl ($scope, Identity) {
    $scope.user = {};
    $scope.login = function () {
        $scope.toggle = true;
        Identity.login($scope.user,
            function (authToken) {
                $scope.toggle = false;
                alert('Congrats! Logged In');
            },
            function (error) {
                $scope.toggle = false;
                alert('Login attempt failed.');
            });
    };
}




function rxLocalStorageCtrl ($scope, LocalStorage) {
    $scope.setSideKick = function () {
        LocalStorage.setObject('joker', { name: 'Harley Quinn' });
    };

    $scope.getSideKick = function () {
        var sidekick = LocalStorage.getObject('joker');
        alert(sidekick.name);
    };
}






/*jshint unused:false*/
function rxModalActionCtrl ($scope) {
    $scope.password = 'guest';

    $scope.populate = function (modalScope) {
        modalScope.user = 'hey_dude';
    };

    $scope.changePass = function (fields) {
        $scope.password = fields.password;
    };
}

function rxModalStateCtrl ($scope, $modalInstance, $timeout, rxNotify) {
    function complete () {
        $scope.loaded = true;
        $scope.setState('complete');
        rxNotify.add('Operation Success!', {
            stack: 'modal',
            type: 'success'
        });
    }

    $scope.submit = function () {
        $scope.setState('confirm');
    };

    $scope.confirm = function () {
        $scope.loaded = false;
        $scope.setState('pending');
        rxNotify.add('Performing Operation...', {
            stack: 'modal',
            loading: true,
            dismiss: [$scope, 'loaded']
        });
        $timeout(complete, 2000);
    };

    $scope.cancel = function () {
        rxNotify.clear('modal');
        $modalInstance.dismiss();
    };
}


/*jshint unused:false*/

function rxNotifyCtrl ($rootScope, $scope, rxNotify, rxPromiseNotifications, $q) {
    $scope.message = 'My message';

    $scope.options = {
        type: 'info',
        timeout: -1,
        dismissable: true,
        show: 'immediate',
        repeat: true
    };

    $scope.routeChange = function (stack) {
        $rootScope.$broadcast('$routeChangeStart', {});
        $rootScope.$broadcast('$routeChangeSuccess', {});
    };

    $scope.add = function (stack) {
        var messageOptions = _.clone($scope.options);
        messageOptions.stack = stack;

        rxNotify.add($scope.message, messageOptions);
    };

    // add a default messages (to custom stack so they don't show on the main page)
    rxNotify.add('Helpful Information', {
        stack: 'demo'
    });
    rxNotify.add('Loading', {
        loading: true,
        stack: 'demo'
    });
    rxNotify.add('You did it!', {
        type: 'success',
        stack: 'demo'
    });
    rxNotify.add('Careful now...', {
        type: 'warning',
        stack: 'demo'
    });
    rxNotify.add('Under Attack by Aliens', {
        type: 'error',
        stack: 'custom'
    });

    // stuff for rxPromiseNotifications
    $scope.addPromise = function () {
        $scope.deferred = $q.defer();

        var promiseScope = rxPromiseNotifications.add($scope.deferred.promise, {
            loading: 'Loading Message',
            success: 'Success Message',
            error: 'Error Message'
        }, 'demo');
    };
}


/*jshint unused:false*/

// This file is used to help build the 'demo' documentation page and should be updated with example code
function rxPageTitleCtrl ($scope, rxPageTitle) {
    $scope.changeTitle = function () {
        rxPageTitle.setTitle($scope.newTitle);
    };

    $scope.refreshTitle = function () {
        $scope.pageTitle = rxPageTitle.getTitle();
    };

    $scope.refreshTitle();
}


/*jshint unused:false*/

// This file is used to help build the 'demo' documentation page and should be updated with example code
function rxPaginateCtrl ($scope, PageTracking) {
    $scope.sorter = {
        predicate: 'id',
        reverse: false
    };
    $scope.pager = PageTracking.createInstance({ itemsPerPage: 3 });

    var makeServers = function (serverCount) {
        var servers = [];
        var os = ['Ubuntu 12.04', 'Red Hat Enterprise Linux 6.4', 'CentOS 6.4', 'Ubuntu 13.04'];
        for (var i = 1; i < serverCount + 1; i++) {
            var server = {
                id: i,
                name: 'Server ' + i,
                os: os[i % os.length]
            };
            servers.push(server);
        }
        return servers;
    };

    $scope.servers = makeServers(21);

    $scope.removeServers = function () {
        if ($scope.servers.length > 2) {
            $scope.servers = $scope.servers.splice(2);
        }
    };

    $scope.addServers = function () {
        $scope.servers = $scope.servers.concat(makeServers(2));
    };
}


function rxPermissionCtrl ($scope, Session, rxNotify) {
    rxNotify.add('Respect My Authority!!', {
        stack: 'permission',
        type: 'warning'
    });

    $scope.storeToken = function () {
        Session.storeToken({ access: { user: { roles: [{ name: 'test' } ] }}});
    }

    $scope.clearToken = function () {
        Session.logout();
    };
}


function rxSessionCtrl ($scope, Session) {
    $scope.isAuthenticated = function () {
        alert(Session.isAuthenticated());
    };
}


function rxSessionStorageCtrl ($scope, SessionStorage) {
    $scope.setSideKick = function () {
        SessionStorage.setItem('Batman', 'Robin');
    };

    $scope.getSideKick = function () {
        alert(SessionStorage.getItem('Batman'));
    };
}


/*jshint unused:false*/

// This file is used to help build the 'demo' documentation page and should be updated with example code
function rxSortableColumnCtrl ($scope, PageTracking, rxSortUtil) {
    $scope.sort = rxSortUtil.getDefault('name');
    $scope.pager = PageTracking.createInstance();

    $scope.sortCol = function (predicate) {
        return rxSortUtil.sortCol($scope, predicate);
    };

    $scope.talentPool = [
        {
            name: 'Andrew Yurisich',
            jobTitle: 'Mailroom Associate IV'
        },
        {
            name: 'Patrick Deuley',
            jobTitle: 'Design Chaplain'
        },
        {
            name: null,
            jobTitle: 'Chief Mastermind'
        },
        {
            jobTitle: 'Assistant Chief Mastermind'
        },
        {
            name: 'Hussam Dawood',
            jobTitle: 'Evangelist of Roger Enriquez'
        },
        {
            name: 'Kerry Bowley',
            jobTitle: 'Dev Mom'
        },
    ];
}


/*jshint unused:false*/
function rxSpinnerCtrl ($scope) {
    $scope.loading = true;
}


function rxStatusCtrl ($scope, $rootScope, Status) {
    Status.setScope($scope);

    $scope.triggerRouteChangeSuccess = function () {
        $rootScope.$broadcast('$routeChangeSuccess');
    };

    $scope.clear = function () {
        Status.clear();
        $scope.notify = undefined;
    };

    $scope.setLoading = function (msg) {
        Status.clear();
        $scope.notify = Status.setLoading(msg);
    };

    $scope.setSuccess = function (msg) {
        Status.clear();
        $scope.notify = Status.setSuccess(msg);
    };

    $scope.setSuccessNext = function (msg) {
        Status.clear();
        $scope.notify = Status.setSuccessNext(msg);
    };

    $scope.setSuccessImmediate = function (msg) {
        Status.clear();
        $scope.notify = Status.setSuccessImmediate(msg);
    };

    $scope.setWarning = function (msg) {
        Status.clear();
        $scope.notify = Status.setWarning(msg);
    };

    $scope.setInfo = function (msg) {
        Status.clear();
        $scope.notify = Status.setInfo(msg);
    };

    $scope.setError = function (msg) {
        Status.clear();
        $scope.notify = Status.setError(msg);
    };

    $scope.dismiss = function () {
        $scope.notify && Status.dismiss($scope.notify);
        $scope.notify = undefined;
    };
}


/*jshint unused:false*/

// This file is used to help build the 'demo' documentation page and should be updated with example code
function rxStatusColumnCtrl ($scope, rxStatusMappings, rxSortUtil) {
    $scope.servers = [
        { status: 'ACTIVE', title: 'ACTIVE status' },
        { status: 'ERROR', title: 'ERROR status' },
        { status: 'DELETED', title: 'DELETED status mapped to ERROR' },
        { status: 'UNKNOWN', title: 'UNKNOWN status mapped to ERROR' },
        { status: 'RESCUE', title: 'RESCUE status mapped to INFO' },
        { status: 'SUSPENDED', title: 'SUSPENDED status mapped to WARNING' },
        { status: 'REBUILD', title: 'REBUILD status mapped to PENDING' },
        { status: 'RESIZE', title: 'RESIZE status mapped to PENDING' },
        { status: 'MIGRATING', title: 'MIGRATING status mapped to PENDING' },
        { status: 'DELETING', title: 'DELETING status mapped to PENDING, using `fooApi` mapping', api:'fooApi' }
    ];

    // We have a few different ways of adding mappings. We've tried to show them all here
    rxStatusMappings.addGlobal({
        'DELETING': 'PENDING'
    });
    rxStatusMappings.mapToInfo('RESCUE');
    rxStatusMappings.mapToWarning('SUSPENDED');
    rxStatusMappings.mapToPending(['REBUILD','RESIZE','MIGRATING']);
    rxStatusMappings.mapToError(['DELETED', 'UNKNOWN']);
    rxStatusMappings.addAPI('fooApi', { 'DELETING': 'PENDING' });
    rxStatusMappings.mapToPending('SomeApiSpecificStatus', 'fooApi');
    $scope.sortCol = function (predicate) {
        return rxSortUtil.sortCol($scope, predicate);
    };
    $scope.sort = rxSortUtil.getDefault('status');
}










/* jshint unused:false */
function tooltipsCtrl ($scope) {
    $scope.dynamicTooltip = 'I was defined in the controller!';
}


/*jshint unused:false*/
function typeaheadCtrl ($scope) {
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
        'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Republic of Dawood',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
}

