var _ = require('lodash');

var notifications = require('../rxNotify.page.js').rxNotify;

describe('rxNotify', function () {

    before(function () {
        demoPage.go('#/component/rxNotify');
    });

    describe('auto dismissal', function () {
        var addToCustomStack;

        before(function () {
            addToCustomStack = function (type, timeout) {
                var input = $('input[ng-model="options.timeout"]');
                input.clear();
                input.sendKeys(timeout);
                $('input[value="' + type + '"]').click();
                element(by.buttonText('Add to Custom Stack')).click();
            };

        });

        it('should add a new success message that dismisses itself', function () {
            addToCustomStack('success', '.5');
            notifications.byStack('custom').byType('success').then(function (successes) {
                expect(successes.length).to.equal(1);
            });
        });

        it('should remove itself after a little while', function () {
            browser.sleep(1000);
            notifications.byStack('custom').byType('success').then(function (successes) {
                expect(successes.length).to.equal(0);
            });
        });

        it('should add a new success message indefinitely', function () {
            addToCustomStack('success', -1);
            notifications.byStack('custom').byType('success').then(function (successes) {
                expect(successes.length).to.equal(1);
            });
        });

    });

    describe('by stack -- demo', function () {

        it('should have 4 notifications in it', function () {
            expect(notifications.byStack('demo').count()).to.eventually.equal(4);
        });

        describe('by type', function () {
            var info;

            before(function () {
                notifications.byStack('demo').byType('info').then(function (infoMessages) {
                    info = infoMessages;
                });
            });

            it('should have two notifications', function () {
                expect(info.length).to.equal(2);
            });

            it('should all be type "info"', function () {
                _.forEach(info, function (infoMessage) {
                    expect(infoMessage.type).to.eventually.equal('info');
                });
            });

            describe('first notification', function () {
                var notification;

                before(function () {
                    notification = info[0];
                });

                it('should have helpful information', function () {
                    expect(notification.text).to.eventually.equal('Helpful Information');
                });

                it('should be dismissable', function () {
                    expect(notification.isDismissable()).to.eventually.be.true;
                });

                it('should not have a spinner', function () {
                    expect(notification.hasSpinner()).to.eventually.be.false;
                });

            });

            describe('second notification', function () {
                var notification;

                before(function () {
                    notification = info[1];
                });

                it('should say it is loading', function () {
                    expect(notification.text).to.eventually.equal('Loading');
                });

                it('should not be dismissable', function () {
                    expect(notification.isDismissable()).to.eventually.be.false;
                });

                it('should have a spinner', function () {
                    expect(notification.hasSpinner()).to.eventually.be.true;
                });

            });

        });

    });

    describe('all notifications', function () {

        it('should have 6 notifications in it', function () {
            expect(notifications.all.count()).to.eventually.equal(6);
        });

        describe('by type', function () {
            var success;

            before(function () {
                notifications.all.byType('success').then(function (successMessages) {
                    success = successMessages;
                });
            });

            it('should have two notifications', function () {
                expect(success.length).to.equal(2);
            });

            it('should all be type "success"', function () {
                _.forEach(success, function (successMessage) {
                    expect(successMessage.type).to.eventually.equal('success');
                });
            });

            describe('first notification', function () {
                var notification;

                before(function () {
                    notification = success[0];
                });

                it('should have done it', function () {
                    expect(notification.text).to.eventually.equal('You did it!');
                });

                it('should be dismissable', function () {
                    expect(notification.isDismissable()).to.eventually.be.true;
                });

                it('should not have a spinner', function () {
                    expect(notification.hasSpinner()).to.eventually.be.false;
                });

            });

            describe('second notification', function () {
                var notification;

                before(function () {
                    notification = success[1];
                });

                it('should have my message', function () {
                    expect(notification.text).to.eventually.equal('My message');
                });

                it('should be dismissable', function () {
                    expect(notification.isDismissable()).to.eventually.be.true;
                });

                it('should not have a spinner', function () {
                    expect(notification.hasSpinner()).to.eventually.be.false;
                });

            });

        });
    });

    describe('notifications exist', function () {

        it('should find a notification with no class and a string (all)', function () {
            expect(notifications.all.exists('Under Attack by Aliens')).to.eventually.be.true;
        });

        it('should find a notification with no class and a string (custom stack)', function () {
            expect(notifications.byStack('custom').exists('Under Attack by Aliens')).to.eventually.be.true;
        });

        it('should find a notification with a class and a string', function () {
            expect(notifications.all.exists('Under Attack by Aliens','error')).to.eventually.be.true;
        });

        it('should find a notification with a class and no string', function () {
            expect(notifications.all.exists('','error')).to.eventually.be.true;
        });

        it('should not find a notification with the wrong class and a string', function () {
            expect(notifications.all.exists('Under Attack by Aliens','success')).to.eventually.be.false;
        });

        it('should not find a notification with the wrong class and no string', function () {
            expect(notifications.all.exists('','abject_failure')).to.eventually.be.false;
        });

        it('should not find a notification with no class and a wrong string', function () {
            expect(notifications.all.exists('Under Attack by Alienists')).to.eventually.be.false;
        });

    });

    describe('dismissing notifications', function () {
        var allMessages;

        before(function () {
            notifications.all.messages.then(function (messages) {
                allMessages = messages;
            });
        });

        it('should dismiss a single notification', function () {
            allMessages[0].dismiss();
        });

        it('should have actually dismissed the message', function () {
            expect(notifications.all.count()).to.eventually.equal(5);
        });

        describe('by stack', function () {

            it('should dismiss every notification in a stack', function () {
                notifications.byStack('custom').dismiss();
            });

            it('should have actually dismissed every message', function () {
                expect(notifications.byStack('custom').count()).to.eventually.equal(0);
            });

        });

        describe('all', function () {

            it('should dismiss all notifications', function () {
                notifications.all.dismiss();
            });

            it('should have actually dismissed every message', function () {
                expect(notifications.all.count()).to.eventually.equal(1);
            });

        });

    });

    describe('stackless notifications', function () {
        var notification;

        before(function () {
            notification = notifications.initialize($('rx-notification[type="error"] .rx-notification'));
        });

        it('should have a warning type', function () {
            expect(notification.type).to.eventually.equal('error');
        });

        it('should say hello', function () {
            expect(notification.text).to.eventually.equal('Hello, world!');
        });

        it('should not be dismissable', function () {
            expect(notification.isDismissable()).to.eventually.be.false;
        });

        it('should not have a spinner', function () {
            expect(notification.hasSpinner()).to.eventually.be.false;
        });

    });

});
