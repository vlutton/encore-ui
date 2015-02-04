/**
 * @ngdoc directive
 * @name encore.ui.rxFloatingHeader:rxFloatingHeader
 * @description
 * Turns a tableheader into a floating persistent header
 */
angular.module('encore.ui.rxFloatingHeader', ['encore.ui.rxMisc'])
.directive('rxFloatingHeader', function (rxDOMHelper) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, table) {

            var state = 'fixed',
                seenFirstScroll = false,

                // The original <tr> elements
                trs = [],

                // The original <th> elements
                ths = [],

                // Clones of the <tr> elements
                clones = [],

                // any <input> elements in the <thead>
                inputs = [],
                maxHeight,
                header = angular.element(table.find('thead'));

            // Grab all the original `tr` elements from the `thead`,
            _.each(header.find('tr'), function (tr) {
                tr = angular.element(tr);
                clones.push(tr.clone());
                trs.push(tr);
                ths = ths.concat(_.map(tr.find('th'), angular.element));
            });

            // Apply .filter-header to any <input> elements
            _.each(ths, function (th) {
                var input = th.find('input');
                if (input.length) {
                    th.addClass('filter-header');
                    input.addClass('filter-box');
                    inputs.push(input);
                }
            });

            scope.updateHeaders = function () {
                if (_.isUndefined(maxHeight)) {
                    maxHeight = table[0].offsetHeight;
                }

                maxHeight = _.max([maxHeight, table[0].offsetHeight]);

                if (rxDOMHelper.shouldFloat(table, maxHeight)) {
                    if (state === 'fixed') {
                        state = 'float';
                        var thWidths = [],
                            trHeights = [];

                        // Get the current height of each `tr` that we want to float
                        _.each(trs, function (tr) {
                            trHeights.push(rxDOMHelper.height(tr));
                        });

                        // Grab the current widths of each `th` that we want to float
                        thWidths = _.map(ths, rxDOMHelper.width);

                        // Put the cloned `tr` elements back into the DOM
                        _.each(clones, function (clone) {
                            header.append(clone);
                        });

                        // Apply the rx-floating-header class to each `tr` and
                        // set a correct `top` for each, to make sure they stack
                        // properly
                        // We previously did tr.css({ 'width': rxDOMHelper.width(tr) })
                        // but it *seems* that setting the widths of the `th` is enough
                        var topOffset = 0;
                        _.each(trs, function (tr, index) {
                            tr.addClass('rx-floating-header');
                            tr.css({ 'top': topOffset });
                            topOffset += trHeights[index];
                        });

                        // Explicitly set the widths of each `th` element that we floated
                        _.each(_.zip(ths, thWidths), function (pair) {
                            var th = pair[0];
                            var width = pair[1];
                            th.css({ 'width': width });
                        });
                    }

                } else {
                    if (state === 'float' || !seenFirstScroll) {
                        state = 'fixed';
                        seenFirstScroll = true;

                        // Make sure that an input filter doesn't have focus when
                        // we re-dock the header, otherwise the browser will scroll
                        // the screen back up ot the input
                        _.each(inputs, function (input) {
                            if (rxDOMHelper.scrollTop() > rxDOMHelper.offset(input).top) {
                                input[0].blur();
                            }
                        });

                        _.each(trs, function (tr) {
                            tr.removeClass('rx-floating-header');
                        });

                        // Detach each cloaned `tr` from the DOM,
                        // but don't destroy it
                        _.each(clones, function (clone) {
                            clone.remove();
                        });
                    }
                }

            };

            rxDOMHelper.onscroll(function () {
                scope.updateHeaders();
            });

        },
    };
});
