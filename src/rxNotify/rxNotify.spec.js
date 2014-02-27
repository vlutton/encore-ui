/* jshint node: true */

describe('rxNotify', function () {
    var scope, compile, rootScope, el, notifySvc, timeout;
    var validTemplate = '<rx-notifications></rx-notifications>';
    var messageText1 = 'My Message 1';
    var messageText2 = 'My Message 2';
    var defaultStack = 'page';
    var otherStack = 'other';

    beforeEach(function () {
        // load module
        module('encore.ui.rxNotify');

        // load templates
        module('templates/rxNotifications.html');
        module('templates/rxNotification.html');

        // Inject in angular constructs
        inject(function ($rootScope, $compile, $timeout, rxNotify) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
            notifySvc = rxNotify;
            timeout = $timeout;
        });

        el = helpers.createDirective(validTemplate, compile, scope);
    });

    afterEach(function () {
        el = null;
    });

    describe('Service: rxNotify', function () {
        it('should add to default stack', function () {
            // create message w/o an options
            notifySvc.add(messageText1);

            // expect message to be first in page stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);
        });

        it('should add unique id to message and return it on add', function () {
            // create message
            var msg = notifySvc.add(messageText1);

            // expect message to be first in page stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);
        });

        it('should allow type specification', function () {
            var defaultType = 'info';

            // create message with no type
            notifySvc.add(messageText1);

            // validate message in stack of default type
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);
            expect(notifySvc.stacks[defaultStack][0].type).to.equal(defaultType);

            // create message with different type
            var messageType = 'warning';
            notifySvc.add(messageText2, {
                type: messageType
            });

            // validate message in stack of type
            expect(notifySvc.stacks[defaultStack][1].text).to.equal(messageText2);
            expect(notifySvc.stacks[defaultStack][1].type).to.equal(messageType);
        });

        it('should add to new stack', function () {
            // create message w/specified stack
            notifySvc.add(messageText1, {
                stack: otherStack
            });

            // validate message in new stack
            expect(notifySvc.stacks[otherStack][0].text).to.equal(messageText1);

            // validate message not in default stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should delete old messages from stack on clear', function () {
            // add message to default stack
            notifySvc.add(messageText1);

            // add message to different stack
            notifySvc.add(messageText2, {
                stack: otherStack
            });

            // validate messages in stacks
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);
            expect(notifySvc.stacks[otherStack][0].text).to.equal(messageText2);

            // run 'clear' method
            notifySvc.clear(defaultStack);

            // validate first message not in default stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);

            // validate other message still on other stack
            expect(notifySvc.stacks[otherStack][0].text).to.equal(messageText2);
        });

        it('should be dismissable', function () {
            // add message to be dismissed
            var msg = notifySvc.add(messageText1);

            // add other message
            notifySvc.add(messageText2);

            // validate both in stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);
            expect(notifySvc.stacks[defaultStack][1].text).to.equal(messageText2);

            // run 'dismiss' method passing in message id
            notifySvc.dismiss(msg);

            // validate dismissed message not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(1);

            // validate other message is still in stack and in first position
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText2);
        });

        it('should set dismissable if passed in', function () {
            // add message w/dismissable set to false
            notifySvc.add(messageText1, {
                dismissable: false
            });

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0].dismissable).to.equal(false);
        });

        it('should disappear after a timeout', function () {
            // add message w/ 1 second timeout
            notifySvc.add(messageText1, {
                timeout: 1
            });

            // wait until before timeout
            timeout.flush(800);

            // validate still in stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);

            // wait until after timeout
            timeout.flush(201);

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should wait until shown to start timeout', function () {
            // add message w/ 1 second timeout and show on route change
            notifySvc.add(messageText1, {
                timeout: 1,
                show: 'next'
            });

            // wait until timeout expires (if it were shown immediately)
            timeout.flush(1500);

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);

            // simulate route change
            rootScope.$broadcast('$routeChangeSuccess');

            // validate now in stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);

            // wait until after timeout
            timeout.flush(1001);

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should remain if timeout not set', function () {
            // add message w/o timeout
            notifySvc.add(messageText1);

            // flush timeouts crazy amount of time (can't pass in nothing otherwise it throws error)
            timeout.flush(100000);

            // validate still in stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);
        });

        it('should dismiss on routeChange', function () {
            // add message
            var msg = notifySvc.add(messageText1);

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);

            // simulate route change
            rootScope.$broadcast('$routeChangeSuccess');

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should only dismiss manually when manual', function () {
            // add message with hide set to 'manual'
            var msg = notifySvc.add(messageText1, {
                dismiss: 'manual'
            });

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);

            // simulate route change
            rootScope.$broadcast('$routeChangeSuccess');

            // validate still in stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);

            // run 'dismiss' method passing in message id
            notifySvc.dismiss(msg);

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should dismiss on variable == true', function () {
            // set expression to equal true (showing)
            scope.loaded = false;

            // add message w/ dismiss property
            var msg = notifySvc.add(messageText1, {
                dismiss: [scope, 'loaded']
            });

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);

            // change variable to true
            scope.loaded = true;
            scope.$digest();

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should show on next on routeChange when set', function () {
            // add message with show set to 'next'
            var msg = notifySvc.add(messageText1, {
                show: 'next'
            });

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);

            // simulate route change
            rootScope.$broadcast('$routeChangeSuccess');

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);

            // simulate another route change
            rootScope.$broadcast('$routeChangeSuccess');

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should show on variable == true', function () {
            // set expression to equal false
            scope.error = false;

            // add message w/ show expression
            var msg = notifySvc.add(messageText1, {
                show: [scope, 'error']
            });

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);

            // change variable to true
            scope.error = true;
            scope.$digest();

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);

            // simulate a route change to dismiss message
            rootScope.$broadcast('$routeChangeSuccess');

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });
    });

    describe('Directive: rxNotifications', function () {
        it('should show only from specific stack', function () {
            // add message (to default stack)
            notifySvc.add(messageText1);

            scope.$digest();

            // validate message is shown
            expect(el.text()).to.contain(messageText1);

            // add other message to different stack
            notifySvc.add(messageText2, {
                stack: otherStack
            });

            scope.$digest();

            // validate other message not shown
            expect(el.text()).to.not.contain(messageText2);
        });

        it('should be hidden when no messages available', function () {
            // validate hidden (via class)
            expect(el.hasClass('ng-hide')).to.be.true;
        });

        it('should be dismiss messages via click', function () {
            // add message
            notifySvc.add(messageText1);

            scope.$digest();

            // validate message is shown
            expect(el.text()).to.contain(messageText1);

            // trigger click on element
            helpers.clickElement(el[0].querySelector('.notification-dismiss'));

            // validate no longer exists
            expect(el.text()).to.not.contain(messageText1);
        });

        it('should show spinner when loading set', function () {
            // add message
            notifySvc.add(messageText1, {
                loading: true
            });

            scope.$digest();

            // validate message is shown
            expect(el.text()).to.contain(messageText1);

            // validate spinner is shown
            expect(el.find('rx-spinner')).to.exist;

            // validate 'dismiss' action not found
            expect(el[0].querySelector('.notification-dismiss')).to.not.exist;
        });
    });

    describe('Service: rxPromiseNotifications', function () {
        var prom, rpn, q;
        var loadingMsg = 'loading';
        var successMsg = 'success';
        var errorMsg = 'error';

        beforeEach(function () {
            inject(function (rxPromiseNotifications, $q) {
                rpn = rxPromiseNotifications;
                q = $q;
            });

            prom = q.defer();
        });

        afterEach(function () {
            prom = null;
        });

        it('should show loading message immediately', function () {
            // create message w/o an options
            rpn.add(prom.promise, {
                loading: loadingMsg
            });

            // expect loading message to be in stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(loadingMsg);
            expect(notifySvc.stacks[defaultStack][0].loading).to.equal(true);
        });

        it('should dismiss loading message after promise resolves', function () {
            rpn.add(prom.promise, {
                loading: loadingMsg,
                success: successMsg
            });

            prom.resolve();

            scope.$digest();

            // expect loading message to no longer be in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(1);
            expect(notifySvc.stacks[defaultStack][0].text).to.not.contain(loadingMsg);
        });

        it('should show success message after promise is resolved successfully', function () {
            rpn.add(prom.promise, {
                loading: loadingMsg,
                success: successMsg
            });

            prom.resolve();

            scope.$digest();

            // expect success message to be the only thing showing
            expect(notifySvc.stacks[defaultStack].length).to.equal(1);
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(successMsg);
        });

        it('should show error message after promise is rejected', function () {
            rpn.add(prom.promise, {
                loading: loadingMsg,
                error: errorMsg
            });

            prom.reject();

            scope.$digest();

            // expect error message to be the only thing showing
            expect(notifySvc.stacks[defaultStack].length).to.equal(1);
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(errorMsg);
        });

        it('should not show messages if route is changed before promise is resolved', function () {
            rpn.add(prom.promise, {
                loading: loadingMsg,
                success: successMsg
            });

            // expect loading to be showing
            expect(notifySvc.stacks[defaultStack].length).to.equal(1);

            // simulate a route change
            rootScope.$broadcast('$routeChangeStart');

            scope.$digest();

            // expect loading message to no longer be in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);

            prom.resolve();

            scope.$digest();

            // expect no messages to be in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should show in custom stack', function () {
            rpn.add(prom.promise, {
                loading: loadingMsg,
                error: errorMsg
            }, otherStack);

            expect(notifySvc.stacks[otherStack][0].text).to.equal(loadingMsg);

            prom.reject();

            scope.$digest();

            // expect error message to be the only thing showing
            expect(notifySvc.stacks[otherStack].length).to.equal(1);
            expect(notifySvc.stacks[otherStack][0].text).to.equal(errorMsg);
        });

        it('should convert expression to string based on response data', function () {
            rpn.add(prom.promise, {
                loading: loadingMsg,
                error: errorMsg + '{{message}}'
            }, otherStack);

            expect(notifySvc.stacks[otherStack][0].text).to.equal(loadingMsg);

            prom.reject({
                message: 'test'
            });

            scope.$digest();

            // expect error message to be the only thing showing
            expect(notifySvc.stacks[otherStack].length).to.equal(1);
            expect(notifySvc.stacks[otherStack][0].text).to.equal(errorMsg + 'test');
        });
    });
});