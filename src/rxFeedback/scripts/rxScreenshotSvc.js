angular.module('encore.ui.rxFeedback')
/**
 * @ngdoc service
 * @name rxFeedback.service:rxScreenshotSvc
 * @description
 * Captures a screenshot for `rxFeedback` submission form.
 *
 * **NOTE:** Requires `html2canvas` which Encore Framework provides by default.
 */
.service('rxScreenshotSvc', function ($log, $q) {
    // double check that html2canvas is loaded
    var hasDependencies = function () {
        var hasHtml2Canvas = typeof html2canvas == 'function';

        return hasHtml2Canvas;
    };

    return {
        capture: function (target) {
            var deferred = $q.defer();

            if (!hasDependencies()) {
                $log.warn('rxScreenshotSvc: no screenshot captured, missing html2canvas dependency');
                deferred.reject('html2canvas not loaded');
            } else {
                html2canvas(target, {
                    onrendered: function (canvas) {
                        var imgData = canvas.toDataURL('image/png');

                        deferred.resolve(imgData);
                    }
                });
            }

            return deferred.promise;
        }
    };
});
