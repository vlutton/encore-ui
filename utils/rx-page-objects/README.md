# rx-page-objects

Using EncoreUI Angular components? Writing Selenium end-to-end automation using Protractor? Save time with these convenient page objects!

## Page Objects

Many of the components that ship with EncoreUI require end to end testing. Why should we waste all of the work we put into assuring ourselves that the components work, when you're going to need to do the same yourself?

**good**:
```js
it('should have actually sorted the column ascending', function () {
    var column = element(by.cssContainingText('rx-sortable-column', 'Name'));
    column.$('i.sort-icon').click();
    column.$('i.sort-icon').click();
    var data = element.all(by.repeater('user in users').column('Name')).getText().then(function (names) {
        expect(names).to.eql(names.sort());
    });
});
```

**better**:
```js
it('should have actually sorted the column ascending', function () {
    var columnElement = element(by.cssContainingText('rx-sortable-column', 'Name'));
    var column = encore.rxSortableColumn.initialize(columnElement, 'user in users');
    column.sortAscending();
    column.data.then(function (names) {
        expect(names).to.eql(names.sort());
    });
});
```

**best**
```js
var Page = require('astrolabe').Page;

var myPage = Page.create({
    column: {
        value: function (columnName) {
            var columnElement = element(by.cssContainingText('rx-sortable-column', columnName));
            return encore.rxSortableColumn.initalize(columnElement);
        }
    }
});

it('should have actually sorted the column ascending', function () {
    var column = myPage.column('Name');
    column.sortAscending();
    column.data.then(function (names) {
        expect(names).to.eql(names.sort());
    });
});
```

When you're using rx-page-objects in your app, you can get back to focusing on what matters -- testing the *business logic* that your app provides, not that all the little buttons, notifications, and menus are working.

## Exercises

But what happens when you need to make sure your rxCharacterCount directives *actually work*? Or that you correctly implemented a pagination component on a table?

What you need is a way to quickly run boring, repetitive tests that ensure your team didn't make any mistakes "wiring up" the component on the page. Because face it, if a user can't get past page one in your table, it's going to look bad on you. Somebody's gotta test the boring stuff.

But why write dozens of the same tests for *every* single pagination widget in your app, when you can use ours?

**bad**:
```js
describe('user list table', function () {
    describe('pagination', function () {
        it('should be present');
        it('should have a next button');
        it('should have a previous button');
        // this goes on for a while...
    }))
});
```

**good**:
```js
describe('user list table', function () {
    describe('pagination', encore.exercise.rxPaginate({
        pageSizes: [3, 50, 200, 350, 500],
        defaultPageSize: 3
    }));
});
```

## Setting up

*command line*

    npm install --save-dev rx-page-objects

*protractor.conf.js*

    onPrepare: function () {
        encore = require('rx-page-objects');
    },

*.jshintrc*

    "globals": {
        encore: true
    }

## Links

Documentation: http://rackerlabs.github.io/encore-ui/rx-page-objects/index.html

Components Demo: http://rackerlabs.github.io/encore-ui/#/overview
