var exercise = require('../rxMetadata.exercise');
var _ = require('lodash');

var transformFns = {
    'Service Level': function (elem) {
        return elem.getText().then(function (text) {
            return _.zipObject(['current', 'proposed'], text.split(' → '));
        });
    },

    'Service Type': function (elem) {
        return elem.getText().then(function (text) {
            return _.zipObject(['current', 'proposed'], text.split(' → '));
        });
    },

    'Amount': function (elem) {
        return elem.getText().then(encore.rxMisc.currencyToPennies);
    },

    'Date Field': function (elem) {
        return elem.getText().then(function (text) {
            return new Date(text);
        });
    },

    'Link Field': function (elem) {
        var promises = [elem.getText(), elem.$('a').getAttribute('href')];
        return protractor.promise.all(promises).then(function (results) {
            return { text: results[0], href: results[1] };
        });
    }
}

describe('rxMetadata', function () {

    before(function () {
        demoPage.go('#/component/rxMetadata');
    });

    describe('Status', exercise.rxMetadata({
        present: true,
        visible: true,
        transformFns: transformFns,

        terms: {
            'Field Name': 'Field Value Example',
            'Another Field Name': 'Another Field Value Example',
            'Third Field Name': 'The Third Field Value Example',
            'Super Long Value': 'A super long data value with anunseeminglyunbreakablewordthatcouldoverflowtothenextcolumn',
            'Short Field Name': 'A long field value given here to show line break style.',
            'Status': 'Active',
            'RCN': 'RCN-555-555-555',
            'Type': 'Cloud',
            'Service Level': { current: 'Managed', proposed: 'Managed' },
            'Service Type': { current: 'DevOps', proposed: 'SysOps' },
            'Amount': 19268,
            'Phone Number Field': '888 - 888 - 8888',
            'Date Field': new Date('January 6, 1989'),
            'Link Field': { text: 'Link', href: browser.baseUrl + '/#' }
        }
    }));

    describe('Status (Empty Transform Functions)', exercise.rxMetadata({
        present: true,
        visible: true,

        terms: {
            'Field Name': 'Field Value Example',
            'Another Field Name': 'Another Field Value Example',
            'Third Field Name': 'The Third Field Value Example',
            'Fourth Field Name': 'The Fourth Field Value Example',
            'Short Field Name': 'A long field value given here to show line break style.',
            'Status': 'Active',
            'RCN': 'RCN-555-555-555',
            'Type': 'Cloud',
            'Service Level': 'Managed → Managed',
            'Service Type': 'DevOps → SysOps',
            'Amount': '$192.68',
            'Phone Number Field': '888 - 888 - 8888',
            'Date Field': 'Friday, January 6, 1989',
            'Link Field': 'Link',
            'Data and Link Field': 'Some data (Link)'
        }
    }));

    describe('rxMetadata', function () {
        var metadata;

        before(function () {
            metadata = encore.rxMetadata.initialize($('rx-metadata'), transformFns);
        });

        it('should report back null for definitions that are not present', function () {
            expect(metadata.term('Witty 2015 Pop Culture Reference')).to.eventually.be.null;
        });

        it('should report back null for definitions that are not displayed', function () {
            expect(metadata.term('First Hidden')).to.eventually.be.null;
        });

        it('should report back custom return values for definitions that are not present', function () {
            expect(metadata.term('Witty 2015 Pop Culture Reference', false)).to.eventually.be.false;
        });

    });
});
