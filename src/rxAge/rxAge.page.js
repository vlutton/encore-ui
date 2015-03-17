var _ = require('lodash');
var moment = require('moment');

exports.rxAge = {

    toMoment: function (rxAgeString) {
        var rxAge;
        var completeAgePart = /^(\d+)(\s+)?([a-z]+)$/;
        if (!completeAgePart.test(rxAgeString)) {
            // catch both short and long form input. '10 hours, 23 minutes' or '10h 23m'
            if (rxAgeString.indexOf(', ') > -1) {
                rxAge = rxAgeString.split(', ');
            } else {
                rxAge = rxAgeString.split(' ');
            }
        } else {
            // It's a single valid age string.
            rxAge = [rxAgeString];
        }

        var ageParts = _.map(rxAge, function (agePart) {
            // ['10d'] -> ['10d', '10', undefined, 'd']
            var matches = agePart.match(completeAgePart);
            // Duration type goes first, then the duration amount.
            return [matches[3], matches[1]];
        });

        var elapsed = _.zipObject(ageParts);
        return moment().utc().subtract(moment.duration(elapsed));
    }

};
