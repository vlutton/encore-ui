/* jshint node: true */

describe('rxApp', function () {
    var scope, compile, rootScope, el, elCustom, defaultNav;
    var standardTemplate = '<rx-app></rx-app>';
    var customTemplate = '<rx-app site-title="My App" menu="customNav"></rx-app>';

    var customNav = [{
        title: 'Example Menu',
        children: [
            {
                href: '/1',
                linkText: '1st Order Item'
            }
        ]
    }];

    beforeEach(function () {
        // load module
        module('encore.ui.rxApp');

        // load templates
        module('templates/rxApp.html');
        module('templates/rxAppNav.html');
        module('templates/rxAppNavItem.html');
        module('templates/rxPage.html');

        // Inject in angular constructs
        inject(function ($rootScope, $compile, encoreNav) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
            defaultNav = encoreNav;
        });

        scope.customNav = customNav;

        el = helpers.createDirective(standardTemplate, compile, scope);
        elCustom = helpers.createDirective(customTemplate, compile, scope);
    });

    it('should have a default title', function () {
        // get page title element
        var pageTitle = el[0].querySelector('.site-title');

        // validate it matches 'Encore'
        expect(pageTitle.textContent).to.equal('Encore');
    });

    it('should allow you to override the default title', function () {
        // get page title element
        var pageTitle = elCustom[0].querySelector('.site-title');

        // validate it matches 'Encore'
        expect(pageTitle.textContent).to.equal('My App');
    });

    it('should have a default nav', function () {
        // get first nav section
        var navTitle = el[0].querySelector('.nav-section-title');

        // validate it matches 'Encore'
        expect(navTitle.textContent).to.equal(defaultNav[0].title);
    });

    it('should allow you to override the default nav', function () {
        // get first nav section
        var navTitle = elCustom[0].querySelector('.nav-section-title');

        // validate it matches custom nav title
        expect(navTitle.textContent).to.equal(customNav[0].title);
    });
});

describe('rxAppNav', function () {
    var scope, compile, rootScope, el;
    var template = '<rx-app-nav items="menuItems" level="1"></rx-app-nav>';

    var menuItems = [{
        href: '/1',
        linkText: '1st Order Item'
    }];

    beforeEach(function () {
        // load module
        module('encore.ui.rxApp');

        // load templates
        module('templates/rxAppNav.html');
        module('templates/rxAppNavItem.html');

        // Inject in angular constructs
        inject(function ($rootScope, $compile) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
        });

        scope.menuItems = menuItems;

        el = helpers.createDirective(template, compile, scope);
    });

    it('should exist', function () {
        expect(el).to.have.length.of.at.least(1);
        expect(el.children()).to.have.length.of.at.least(1);
    });

    it('should add "level" class of appropriate level', function () {
        expect(el.hasClass('rx-app-nav-level-1')).to.be.true;
    });

//     allow children to be dynamically injected
});

describe('rxAppNavItem', function () {
    var scope, compile, rootScope, el, location;
    var template = '<rx-app-nav-item></rx-app-nav-item>';

    var menuItem = {
        href: '/1',
        linkText: '1st',
        directive: 'fake-directive',
        children: [
            {
                href: '/1-1',
                linkText: '1st-1st',
                active: true,
                children: [
                    {
                        href: '/1-1-1',
                        linkText: '1st-1st-1st'
                    }
                ]
            }, {
                href: '/1-2',
                linkText: '1st-2nd'
            }, {
                href: '/1-3',
                linkText: '1st-3rd',
                children: [
                    {
                        href: '/1-3-1',
                        linkText: '1st-3rd-1st'
                    }
                ]
            }
        ]
    };

    beforeEach(function () {
        // load module
        module('encore.ui.rxApp');

        // load templates
        module('templates/rxAppNav.html');
        module('templates/rxAppNavItem.html');

        // Inject in angular constructs
        inject(function ($rootScope, $compile, $location) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
            location = $location;
        });

        scope.item = menuItem;

        el = helpers.createDirective(template, compile, scope);
    });

    it('should exist', function () {
        expect(el).to.have.length.of.at.least(1);
        expect(el.children()).to.have.length.of.at.least(2);
    });

    it('should determine active state based on URL match', function () {
        expect(scope.item.active, 'item should not be active by default').to.be.false;

        // update location
        location.path(menuItem.href);
        rootScope.$apply();

        // sanity check that location actually changed
        expect(location.path()).to.equal(menuItem.href);

        expect(scope.item.active, 'item should be active when path changes').to.be.true;

        // update location again to somewhere else
        location.path('somewhereElse');
        rootScope.$apply();

        expect(scope.item.active, 'item should no longer be active').to.be.false;
    });

    it('should set active state based on JSON', function () {
        // should keep active state already defined, even though not on path
        expect(scope.item.children[0].active).to.be.false;

        // update location again to somewhere else
        location.path('somewhereElse');
        rootScope.$apply();

        expect(scope.item.active, 'item should no longer be active').to.be.false;
    });

    it('should show/hide content depending on item active state', function () {
        // get children element
        var content = el[0].querySelector('.item-content');

        // validate that element is hidden
        expect(content.className).to.contain('ng-hide');

        // update location
        location.path(menuItem.href);
        rootScope.$apply();

        // validate that element is visible
        expect(content.className).to.not.contain('ng-hide');
    });

    it('should build children if available', function () {
        // get children element
        var children = el[0].querySelector('.item-children .rx-app-nav');

        expect(children).to.exist;

        // should have 5 child items (including sub-sub-nav)
        expect(children.querySelectorAll('.rx-app-nav-item')).to.have.length.of(5);
    });

    it('should build directive if available', function () {
        // get directive
        var directive = el[0].querySelector('.item-directive');

        expect(directive).to.exist;
        expect(directive.className).to.not.contain('.ng-hide');

        // sanity check that it correctly built directive HTML
        expect(directive.innerHTML).to.contain('<' + menuItem.directive);
        expect(directive.innerHTML).to.contain('</' + menuItem.directive + '>');
    });

    it('should increment the scope\'s level', function () {
        expect(scope.level).to.equal(1);

        // get children element
        var children = el[0].querySelector('.item-children .rx-app-nav-group');
        children = angular.element(children);
        expect(children.scope().level).to.equal(2);
    });

//     show header for children if present and active
//     allow different links based on environment
//     build links based on environment
});