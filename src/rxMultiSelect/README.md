[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

[API Documentation](ngdocs/index.html#/api/rxMultiSelect)

## rxMultiSelect

A replacement for `<select multiple>` when space is an issue, such as in the header of a table.

The options for the control can be specified by passing an array of strings (corresponding to the options' values) to the `options` attribute of the directive or using `<rx-select-option>`s. An 'All' option is automatically set as the first option for the dropdown, which allows all options to be toggled at once.

The following two dropdowns are equivalent.
```
<!-- $scope.available = [2014, 2015] -->
<rx-multi-select ng-model="selected" options="available"></rx-multi-select>

<rx-multi-select ng-model="selected">
    <rx-select-option value="2014"></rx-select-option>
    <rx-select-option value="2015"></rx-select-option>
</rx-multi-select>
```

This component requires the `ng-model` attribute and binds the model to an array of the selected options.

The preview text (what is shown when the element is not active) follows the following rules:
* If no items are selected, show "None".
* If only one item is selected from the dropdown, its label will display.
* If > 1 but < n-1 items are selected, show "[#] Selected".
* If all but one item is selected, show "All except [x]"
* If all items are selected, show "All Selected".

## rxSelectOption

`<rx-select-option>` is to `<rx-multi-select>` as `<option>` is to `<select>`.

Just like `<option>`, it has a `value` attribute and uses the element's content for the label. If the label is not provided, it defaults to a titleized version of `value`.

```
<rx-select-option value="DISABLED">Disabled</rx-select-option>
```