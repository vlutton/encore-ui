/* jshint node: true */
/* jshint camelcase:false */
describe('Breadcrumbs', function () {
    var scope, compile, rootScope, breadcrumbs, freshBreadcrumbs;

    var mockBreadcrumbs = [{
        path: 'one',
        name: 'One'
    }, {
        path: 'two',
        name: 'Two'
    }];

    var defaultBreadcrumb = {
        path: '',
        name: 'Home'
    };

    beforeEach(function () {
        // Load the service's module
        module('encore.ui.rxBreadcrumbs');

        // load the template
        module('templates/rxBreadcrumbs.html');

        // Inject in angular constructs otherwise,
        // you would need to inject these into each test
        inject(function (rxBreadcrumbsSvc, $rootScope, $compile) {
            breadcrumbs = rxBreadcrumbsSvc;
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
        });

        // copy the mockBreadcrumbs so we don't mess it up
        freshBreadcrumbs = mockBreadcrumbs.slice(0);
    });

    describe('directive', function () {
        var el,
            validTemplate = '<rx-breadcrumbs></rx-breadcrumbs>';

        beforeEach(function () {
            // Inject mock breadcrumbs
            breadcrumbs.set(mockBreadcrumbs);

            el = helpers.createDirective(validTemplate, compile, scope);

            scope.$digest();
        });

        it('should not have last breadcrumb as a link', function () {
            var lastText = mockBreadcrumbs[1].name;
            expect(el.find('a').text()).to.not.contain(lastText);
        });

        it('should create links for each breadcrumb', function () {
            // spy on location service
            var links = el.find('a');

            expect(links).to.have.length(2);
            expect(links.eq(0).attr('href')).to.eql('');
            expect(links.eq(1).attr('href')).to.eql('one');
        });

        it('should add a class of "first" to the first breadcrumb', function () {
            var firstLink = el.find('a').eq(0);

            expect(firstLink.hasClass('first')).to.be.true;
        });

        it('should add a class of "last" to the last breadcrumb', function () {
            var items = el[0].getElementsByClassName('breadcrumb-name');

            expect(items[items.length - 1].className).to.contain('last');
        });
    });

    describe('rxBreadcrumbsSvc', function () {
        it('should have a default first link', function () {
            expect(breadcrumbs.getAll()[0]).to.eql(defaultBreadcrumb);
        });

        it('should allow contents to be set via set method', function () {
            breadcrumbs.set(freshBreadcrumbs);

            // we need to add on the default breadcrumb for comparison since it's added by the service
            freshBreadcrumbs.unshift(defaultBreadcrumb);

            expect(breadcrumbs.getAll()).to.eql(freshBreadcrumbs);
        });

        it('should not allow contents to be set outside set method', function () {
            breadcrumbs.set(freshBreadcrumbs);

            var tmpBreadcrumbs = breadcrumbs.getAll();

            // updating the returned array should not do anything
            tmpBreadcrumbs.push({
                path: '/',
                name: 'something'
            });

            // we need to add on the default breadcrumb for comparison since it's added by the service
            freshBreadcrumbs.unshift(defaultBreadcrumb);

            // breadcrumbs should equal original
            expect(breadcrumbs.getAll()).to.eql(freshBreadcrumbs);
        });

        it('should overwrite previous breadcrumbs', function () {
            // set inital breadcrumbs to be overwritten
            breadcrumbs.set(mockBreadcrumbs);

            var somePage =  {
                path: '/',
                name: 'Some Page'
            };

            // add new item to breadcrumbs
            freshBreadcrumbs.unshift(somePage);

            // update breadcrumbs service
            breadcrumbs.set(freshBreadcrumbs);

            // add homepage for comparison
            freshBreadcrumbs.unshift(defaultBreadcrumb);

            expect(breadcrumbs.getAll()).to.eql(freshBreadcrumbs);
        });
    });
});
