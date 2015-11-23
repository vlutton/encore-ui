var _ = require('lodash');

exports.rxEnvironment = {
    /**
      Return the current environment the user sees.
      The default is set to something simple and reasonable,
      but should you find a need to supply your own environments, be
      sure to have `environments` defined in your protractor conf's params section.
    */
    current: function () {
        var component = this;
        return browser.getCurrentUrl().then(function (url) {
            return component.compare(url);
        });
    },

    /**
      Return the original environment, as defined in the current protractor conf file.
      Returns a promise to keep the usage consistent with `rxEnvironment.current`.
    */
    original: function () {
        return protractor.promise.fulfilled(this.compare(browser.baseUrl));
    },

    compare: function (url) {
        return _.find(this.environments, function findEnvironment (envName, env) {
            if (_.contains(url, env)) {
                return envName;
            }
        }) || 'production';
    },

    // Clones the environments param before filling in any missing entries with the defaults below.
    environments: _.extend({
        'localhost': 'localhost',
        'staging': 'staging',
        'preprod': 'preprod'
    }, browser.params.environments),

    isLocalhost: function (namedParams) {
        return this.confirmEnvironment(namedParams, 'localhost');
    },

    isStaging: function (namedParams) {
        return this.confirmEnvironment(namedParams, 'staging');
    },

    isPreprod: function (namedParams) {
        return this.confirmEnvironment(namedParams, 'preprod');
    },

    isProd: function (namedParams) {
        return this.confirmEnvironment(namedParams, 'production');
    },

    /**
      `namedParams` only supports { useBaseUrl: true }. If { useBaseUrl: false }, just leave undefined.
    */
    confirmEnvironment: function (namedParams, environment) {
        var component = this;
        if (namedParams === undefined) {
            namedParams = { useBaseUrl: false };
        }

        return browser.getCurrentUrl().then(function (url) {
            return _.isEqual(component.compare(namedParams.useBaseUrl ? protractor.baseUrl : url), environment);
        });
    }
};
