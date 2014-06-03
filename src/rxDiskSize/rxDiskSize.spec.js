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

    it('should convert 100 to 100 GB', function () {
        var size = 100;
        expect(disksize(size)).to.equal('100 GB');
    });

    it('should convert 1000 to 1 TB', function () {
        var size = 1000;
        expect(disksize(size)).to.equal('1 TB');
    });

    it('should convert 1000000 to 1 PB', function () {
        var size = 1000000;
        expect(disksize(size)).to.equal('1 PB');
    });

    it('should convert 500 with a GB unit specified to 500 GB', function () {
        var size = 500;
        var unit = 'GB';
        expect(disksize(size, unit)).to.equal('500 GB');
    });

    it('should convert 5000 with a TB unit specified to 5 TB', function () {
        var size = 5000;
        var unit = 'TB';
        expect(disksize(size, unit)).to.equal('5 TB');
    });

    it('should convert 5000000 with a PB unit specified to 5 PB', function () {
        var size = 5000000;
        var unit = 'PB';
        expect(disksize(size, unit)).to.equal('5 PB');
    });

});
