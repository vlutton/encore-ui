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
            var id = notifySvc.add(messageText1);

            // expect message to be first in page stack
            expect(notifySvc.stacks[defaultStack][0].id).to.equal(id);
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
            var messageId = notifySvc.add(messageText1);

            // add other message
            notifySvc.add(messageText2);

            // validate both in stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);
            expect(notifySvc.stacks[defaultStack][1].text).to.equal(messageText2);

            // run 'dismiss' method passing in message id
            notifySvc.dismiss(messageId, defaultStack);

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
            var id = notifySvc.add(messageText1);

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0].id).to.equal(id);

            // simulate route change
            rootScope.$broadcast('$routeChangeSuccess');

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should only dismiss manually when manual', function () {
            // add message with hide set to 'manual'
            var id = notifySvc.add(messageText1, {
                dismiss: 'manual'
            });

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0].id).to.equal(id);

            // simulate route change
            rootScope.$broadcast('$routeChangeSuccess');

            // validate still in stack
            expect(notifySvc.stacks[defaultStack][0].id).to.equal(id);

            // run 'dismiss' method passing in message id
            notifySvc.dismiss(id, defaultStack);

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should dismiss on variable == true', function () {
            // set expression to equal true (showing)
            scope.loaded = false;

            // add message w/ dismiss property
            var id = notifySvc.add(messageText1, {
                dismiss: [scope, 'loaded']
            });

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0].id).to.equal(id);

            // change variable to true
            scope.loaded = true;
            scope.$digest();

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should show on next on routeChange when set', function () {
            // add message with show set to 'next'
            var id = notifySvc.add(messageText1, {
                show: 'next'
            });

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);

            // simulate route change
            rootScope.$broadcast('$routeChangeSuccess');

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0].id).to.equal(id);

            // simulate another route change
            rootScope.$broadcast('$routeChangeSuccess');

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should show on variable == true', function () {
            // set expression to equal false
            scope.error = false;

            // add message w/ show expression
            var id = notifySvc.add(messageText1, {
                show: [scope, 'error']
            });

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);

            // change variable to true
            scope.error = true;
            scope.$digest();

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0].id).to.equal(id);

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
    });

    describe('Directive: rxNotification', function () {
        it('should be dismissable via click', function () {
            // add message
            notifySvc.add(messageText1);

            scope.$digest();

            // validate message is shown
            expect(el.text()).to.contain(messageText1);

            // trigger click on element
            var dismissButton = el.find('rx-notification').find('button');
            helpers.clickElement(dismissButton[0]);

            // validate no longer exists
            expect(el.text()).to.not.contain(messageText1);
        });
    });
});