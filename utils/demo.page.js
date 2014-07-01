var Page = require('astrolabe').Page;

module.exports = Page.create({
    url: { value: '' },

    storeTokenButton: {
        get: function () {
            return this.findElement(this.by.css('button.storeToken'));
        }
    },

    clearTokenButton: {
        get: function () {
            return this.findElement(this.by.css('button.clearToken'));
        }
    },

    rxPageSubtitleButton: {
        get: function () {
            return this.findElement(this.by.css('button.changeSubtitle'));
        }
    }
});
