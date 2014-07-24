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
    },
    wraith: {
        command: 'wraith capture config',
        options: {
            stdout: true,
            execOptions: {
                cwd: 'wraith'
            }
        }
    }
};