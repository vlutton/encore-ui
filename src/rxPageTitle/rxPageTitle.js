angular.module('encore.ui.rxPageTitle', [])
.factory('rxPageTitle', function ($document) {
    var suffix = '',
        title = '';

    return {
        setSuffix: function (s) {
            suffix = s;
        },
        getSuffix: function () {
            return suffix;
        },
        setTitle: function (t) {
            if (suffix !== '') {
                title = t + suffix;
            } else {
                title = t;
            }

            // protect against null, which can crash some browsers
            if (_.isEmpty(title)) {
                title = '';
            }

            var div = $document[0].createElement('div');
            div.innerHTML = title;
            var text = div.textContent || div.innerText || '';
            $document.prop('title', text);
        },
        getTitle: function () {
            return $document.prop('title');
        }
    };
});
