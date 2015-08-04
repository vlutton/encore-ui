var rxFloatingHeader = encore.rxFloatingHeader;

describe('rxFloatingHeader', function () {
    var table, tr, middleRow, middleRowY, initialY;

    describe('One header row table', function () {
        before(function () {
            demoPage.go('#/components/rxFloatingHeader');
            table = $('table[rx-floating-header].no-filter');
            tr = table.$('thead tr:first-of-type');
            middleRow = table.$('.middle-row');
            protractor.promise.all([middleRow.getLocation(), tr.getLocation()]).then(function (locations) {
                middleRowY = locations[0].y;
                initialY = locations[1].y;
            });
        });

        it('should show element', function () {
            expect(table.isDisplayed()).to.eventually.be.true;
        });

        it('should float header after scrolling to middle of table', function () {
            rxFloatingHeader.scrollToElement(middleRow);
            expect(rxFloatingHeader.compareYLocations(tr, middleRowY)).to.eventually.be.true;
        });

        it('should put the header back when scrolling to the top', function () {
            rxFloatingHeader.scrollToElement($('.page-titles'));
            expect(rxFloatingHeader.compareYLocations(tr, initialY)).to.eventually.be.true;
        });
    });

    describe('Multi header row table', function () {
        var filterHeader, titlesHeader, initialFilterY, filterHeight, windowSize;
        var window = browser.driver.manage().window();
        var trs;

        before(function () {
            // Set the height smaller so the header can float no matter the screen size
            window.getSize().then(function (size) {
                windowSize = size;
                window.setSize(windowSize.width, 400);
            });

            table = $('table[rx-floating-header].filter');
            trs = table.$$('thead tr');
            filterHeader = trs.get(0);
            titlesHeader = trs.get(1);
            middleRow = table.$('.middle-row');
            var locationPromises = [middleRow.getLocation(), filterHeader.getLocation(), filterHeader.getSize()];
            protractor.promise.all(locationPromises).then(function (locations) {
                middleRowY = locations[0].y;
                initialFilterY = locations[1].y;
                filterHeight = locations[2].height;
            });
        });

        it('should float to the header after scrolling to middle of table', function () {
            rxFloatingHeader.scrollToElement(middleRow);
            expect(rxFloatingHeader.compareYLocations(filterHeader, middleRowY)).to.eventually.be.true;
        });

        it('should have the right distance between the float header and the middle of the table', function () {
            expect(rxFloatingHeader.compareYLocations(titlesHeader, middleRowY + filterHeight)).to.eventually.be.true;
        });

        it('should scroll to the first element when given an ElementArrayFinder', function () {
            rxFloatingHeader.scrollToElement(trs);
            expect(rxFloatingHeader.compareYLocations(filterHeader, initialFilterY)).to.eventually.be.true;
        });

        it('should have the right distance between the title header and the initial starting point', function () {
            expect(rxFloatingHeader.compareYLocations(titlesHeader, initialFilterY + filterHeight))
                .to.eventually.be.true;
        });

        after(function () {
            // Return window to original size
            window.setSize(windowSize.width, windowSize.height);
        });

    });

});
