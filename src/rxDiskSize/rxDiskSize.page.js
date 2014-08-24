/*jshint node:true*/
exports.rxDiskSize = {

    toBytes: function (rxDiskSizeString) {
        var parts = rxDiskSizeString.split(' ');
        var size = parseFloat(parts[0]);
        var magnitude = {
            'B': 1,
            'K': Math.pow(10, 3),
            'M': Math.pow(10, 6),
            'G': Math.pow(10, 9),
            'T': Math.pow(10, 12),
            'P': Math.pow(10, 15)
        }[parts[1].toUpperCase()[0]];
        return size * magnitude;
    },

    toGigabytes: function (rxDiskSizeString) {
        return this.toBytes(rxDiskSizeString) / Math.pow(10, 9);
    }

};
