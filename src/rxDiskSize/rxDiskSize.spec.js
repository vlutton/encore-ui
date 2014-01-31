/* jshint node: true */

describe('rxDiskSize', function () {
    var disksize;

    beforeEach(function () {
        module('encore.ui.rxDiskSize');

        inject(function ($filter) {
            disksize = $filter('rxDiskSize');
        });
    });

    it('should exist', function () {
        expect(!!disksize).to.be.true;
    });

    it('should convert convert 100 to 100 GB', function () {
        var size = 100;
        expect(disksize(size)).to.equal('100 GB');
    });

    it('should convert convert 1000 to 1 TB', function () {
        var size = 1000;
        expect(disksize(size)).to.equal('1 TB');
    });

    it('should convert convert 1000000 to 1 PB', function () {
        var size = 1000000;
        expect(disksize(size)).to.equal('1 PB');
    });
});