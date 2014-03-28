[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This component allows you to add attributes based on a value in scope being defined or not.

## Example

    <div rx-attributes="{'my-custom-attr': customAttrVal, 'ng-click': noFunc}" ng-controller="myCtrl"></div>

    <script>
    function myCtrl (scope) {
        scope.customAttrVal = 'some value';
    }
    </script>

Given this code, if the scope only had `scope.customAttrVal` set, only `my-custom-attr` would be added to the component. Since noFunc was never defined, `ng-click` isn't added.

The output of the above code is:

    <div my-custom-attr="some value" ng-controller="myCtrl"></div>

## Value Format

The value of `rx-attributes` follows the same object convention as `ng-class`, in that it takes in an object to parse through. The object follows this pattern:

    {
        'attribute-name': scopeValue,
        'another-attribute-name': anotherScopeValue,
    }