/*jshint node:true*/
module.exports = {
    rxPageObjects: {
        command: 'npm pack',
        options: {
            stdout: true,
            execOptions: {
                cwd: 'utils/rx-page-objects'
            }
        }
    }
};