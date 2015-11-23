describe('rxFloatingHeader', function () {
    var table, tr, middleRow, middleRowY, initialY;
    var yTolerance = 2; // +/- pixel tolerance for Y value comparison
    var lower, upper;
    var actual;

    before(function () {
        demoPage.go('#/components/rxFloatingHeader');
    });

    describe('Single-row header table', function () {
        before(function () {
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

        describe('after scrolling to middle of table', function () {
            before(function () {
                encore.rxMisc.scrollToElement(middleRow);
            });

            it('should float header', function () {
                actual = encore.rxMisc.transformLocation(tr, 'y');
                lower = middleRowY - yTolerance;
                upper = middleRowY + yTolerance;
                expect(actual).to.eventually.be.within(lower, upper);
            });

            describe('after scrolling back to top', function () {
                before(function () {
                    encore.rxMisc.scrollToElement($('.page-titles'));
                });

                it('should put the header back', function () {
                    actual = encore.rxMisc.transformLocation(tr, 'y');
                    lower = initialY - yTolerance;
                    upper = initialY + yTolerance;
                    expect(actual).to.eventually.be.within(lower, upper);
                });
            });//after scrolling to top
        });//after scrolling to middle
    });//Single-row header table

    describe('Multi-row header table', function () {
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

        describe('after scrolling to middle of table', function () {
            before(function () {
                encore.rxMisc.scrollToElement(middleRow);
            });

            it('should float the header', function () {
                actual = encore.rxMisc.transformLocation(filterHeader, 'y');
                lower = middleRowY - yTolerance;
                upper = middleRowY + yTolerance;
                expect(actual).to.eventually.be.within(lower, upper);
            });

            it('should have correct distance between float header and middle of table', function () {
                actual = encore.rxMisc.transformLocation(titlesHeader, 'y');
                lower = middleRowY + filterHeight - yTolerance;
                upper = middleRowY + filterHeight + yTolerance;
                expect(actual).to.eventually.be.within(lower, upper);
            });
        });//after scrolling to middle of table

        describe('when given an ElementArrayFinder', function () {
            before(function () {
                encore.rxMisc.scrollToElement(trs);
            });

            it('should scroll to the first element', function () {
                actual = encore.rxMisc.transformLocation(filterHeader, 'y');
                lower = initialFilterY - yTolerance;
                upper = initialFilterY + yTolerance;
                expect(actual).to.eventually.be.within(lower, upper);
            });

            it('should have correct distance between title header and initial starting point', function () {
                actual = encore.rxMisc.transformLocation(titlesHeader, 'y');
                lower = initialFilterY + filterHeight - yTolerance;
                upper = initialFilterY + filterHeight + yTolerance;
                expect(actual).to.eventually.be.within(lower, upper);
            });
        });

        after(function () {
            // Return window to original size
            window.setSize(windowSize.width, windowSize.height);
        });
    });//Multi-row header table
});
