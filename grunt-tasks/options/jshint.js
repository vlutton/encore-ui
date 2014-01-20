module.exports = {
    files: ['Gruntfile.js','src/**/*.js'],
    options: {
        curly: true,
        immed: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        globals: {
            angular: true
        }
    }
};