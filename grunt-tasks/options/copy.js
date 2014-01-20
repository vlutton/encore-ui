module.exports = {
    demohtml: {
        files: [{
            expand: true,
            src: ["**/*.html"],
            cwd: "misc/demo/",
            dest: "dist/"
        }]
    },
    demoassets: {
        files: [{
            expand: true,
            //Don't re-copy html files, we process those
            src: ["**/**/*", "!**/*.html"],
            cwd: "misc/demo",
            dest: "dist/"
        }]
    }
};