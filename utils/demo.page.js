var Page = require('astrolabe').Page;

module.exports = Page.create({
    url: { value: 'http://localhost:9001' },
    storeTokenButton: {
        get: function () {
            return this.findElement(this.by.css('button.storeToken'));
        }
    },
    clearTokenButton: {
        get: function () {
            return this.findElement(this.by.css('button.clearToken'));
        }
    }
});
