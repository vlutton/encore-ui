var tabsPage = require('../tabs.page.js').tabs;

describe('tabs', function () {
    var tabs;
    var tabNames = ['Bacon Ipsum', 'Veggie Ipsum', 'Cat Ipsum (meow)', 'Tupac Ipsum'];

    before(function () {
        demoPage.go('#/component/tabs');
        tabs = tabsPage.initialize($('#tabs'));
    });

    it('should show element', function () {
        expect(tabs.isDisplayed()).to.eventually.be.true;
    });

    it('should count all the tabs', function () {
        expect(tabs.count()).to.eventually.equal(tabNames.length);
    });

    it('should still have all tabs match the test data', function () {
        expect(tabs.allNames).to.eventually.eql(tabNames);
    });

    it('should not find tabs that are not represented', function () {
        expect(tabs.hasTab('Yankovipsum')).to.eventually.be.false;
    });

    it('should find tabs that represent', function () {
        expect(tabs.hasTab('Tupac Ipsum')).to.eventually.be.true;
    });

    it('should have an active tab', function () {
        expect(tabs.activeTab.name).to.eventually.equal('Bacon Ipsum');
    });

    it('should get a tab by index', function () {
        expect(tabs.byIndex(1).name).to.eventually.equal('Veggie Ipsum');
    });

    it('should report null for tabs missing subtitles', function () {
        expect(tabs.byIndex(-1).subtitle).to.eventually.be.null;
    });

    describe('tab', function () {
        var tab;

        before(function () {
            tab = tabs.byName('Cat Ipsum');
        });

        it('should be displayed', function () {
            expect(tab.isDisplayed()).to.eventually.be.true;
        });

        it('should still not be the active tab', function () {
            expect(tab.isActive()).to.eventually.be.false;
        });

        it('should report that it is the active tab after visiting it', function () {
            tab.visit();
            expect(tab.isActive()).to.eventually.be.true;
        });

        it('should be the active tab in the tabs group', function () {
            expect(tabs.activeTab.name).to.eventually.equal('Cat Ipsum');
        });

        it('should have a full name', function () {
            expect(tab.fullName).to.eventually.equal('Cat Ipsum (meow)');
        });

        it('should have a name', function () {
            expect(tab.name).to.eventually.equal('Cat Ipsum');
        });

        it('should have a subtitle', function () {
            expect(tab.subtitle).to.eventually.equal('(meow)');
        });

    });

    describe('all tabs', function () {
        var allTabs;

        before(function () {
            demoPage.go('#/component/hotkeys');
            tabsPage.main.all.then(function (mainTabs) {
                allTabs = mainTabs;
            });
        });

        it('should match the count from the tabs group', function () {
            expect(tabsPage.main.count()).to.eventually.equal(allTabs.length);
        });

        it('should match the tabs by index', function () {
            tabsPage.main.byIndex(1).name.then(function (name) {
                expect(allTabs[1].name).to.eventually.equal(name);
            });
        });

        it('should update the active tab in all tabs', function () {
            allTabs[2].visit();
            expect(allTabs[2].isActive()).to.eventually.be.true;
        });

    });

});
