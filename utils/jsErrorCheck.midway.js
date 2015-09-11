var Page = require('astrolabe').Page;

var componentsPage = Page.create({

    tblComponents: {
        get: function () {
            return element.all(by.repeater('comp in vm.components'));
        }
    },

    row: {
        value: function (index) {
            var page = this;
            return Page.create({
                rootElement: {
                    get: function () {
                        return page.tblComponents.get(index);
                    }
                },

                visit: {
                    value: function () {
                        return this.rootElement.element(by.binding('name')).click();
                    }
                }

            })
        }
    }

});

describe('javascript error checking', function () {
    var components = [
        'configs',
        'grid',
        'hotkeys',
        'layout',
        'metadata',
        'progressbar',
        'rxAccountInfo',
        'rxActionMenu',
        'rxActiveUrl',
        'rxAge',
        'rxApp',
        'rxAppRoutes',
        'rxAttributes',
        'rxAuth',
        'rxBreadcrumbs',
        'rxBulkSelect',
        'rxButton',
        'rxCapitalize',
        'rxCharacterCount',
        'rxCheckbox',
        'rxCollapse',
        'rxCompile',
        'rxDiskSize',
        'rxEnvironment',
        'rxFavicon',
        'rxFeedback',
        'rxFloatingHeader',
        'rxForm',
        'rxIdentity',
        'rxInfoPanel',
        'rxLocalStorage',
        'rxLogout',
        'rxMetadata',
        'rxMisc',
        'rxModalAction',
        'rxNotify',
        'rxOptionTable',
        'rxPageTitle',
        'rxPaginate',
        'rxPermission',
        'rxRadio',
        'rxSearchBox',
        'rxSelect',
        'rxSelectFilter',
        'rxSession',
        'rxSessionStorage',
        'rxSortableColumn',
        'rxSpinner',
        'rxStatus',
        'rxStatusColumn',
        'rxToggle',
        'rxToggleSwitch',
        'rxTokenInterceptor',
        'rxUnauthorizedInterceptor',
        'tabs',
        'tooltips',
        'typeahead'
    ];

    before(function () {
        demoPage.go('#/components');
    });

    it('should have all components listed', function () {
        var names = element.all(by.repeater('comp in vm.components').column('name')).getText();
        expect(names).to.eventually.eql(components);
    });

    components.forEach(function (component, index) {
        it('should not have any javascript errors for the ' + component + ' component', function () {
            componentsPage.row(index).visit();
            // protractor will fail if any javascript errors are found
            encore.rxBreadcrumbs.initialize($('header rx-breadcrumbs')).byPosition(1).visit();
        });
    });

});
