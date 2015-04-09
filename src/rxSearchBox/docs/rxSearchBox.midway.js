var rxSearchBoxPage = require('../rxSearchBox.page').rxSearchBox;
var exercise = require('../rxSearchBox.exercise');

describe('rxSearchBox', function () {
    before(function () {
        demoPage.go('#/component/rxSearchBox');
    });

    describe('default rxSearchBox', exercise.rxSearchBox({
        cssSelector: '.default-search-box'
    }));

    describe('disabled rxSearchBox', exercise.rxSearchBox({
        cssSelector: '.disabled-search-box',
        disabled: true
    }));

    describe('custom, wide rxSearchBox', exercise.rxSearchBox({
        cssSelector: '.wide-search-box',
        placeholder: 'Filter by any...'
    }));
});//rxSearchBox
