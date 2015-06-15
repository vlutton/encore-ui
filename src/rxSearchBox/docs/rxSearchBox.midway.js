var rxSearchBoxPage = encore.rxSearchBox;

describe('rxSearchBox', function () {
    before(function () {
        demoPage.go('#/component/rxSearchBox');
    });

    describe('default rxSearchBox', encore.exercise.rxSearchBox({
        cssSelector: '.default-search-box'
    }));

    describe('disabled rxSearchBox', encore.exercise.rxSearchBox({
        cssSelector: '.disabled-search-box',
        disabled: true
    }));

    describe('custom, wide rxSearchBox', encore.exercise.rxSearchBox({
        cssSelector: '.wide-search-box',
        placeholder: 'Filter by any...'
    }));
});//rxSearchBox
