module.exports = {
    generic: {
        src: [
            'src/*/*.js',
            '!src/*/*.spec.js',
            '!src/configs/configs.js'
        ],
        options: {
            breakOnErrors: false
        }
    }
};