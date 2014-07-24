[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

The rxForm component is a set of directives used to create forms throughout Encore. These directives provide a common HTML layout and style for all form elements, which helps ensure form accessibility and makes creating new forms easier.

**NOTE**: `rxFormInput`, `rxFormRadio` and `rxFormSelect` are deprecated and will be removed in a future version. Please use rxFormItem for all your form input needs!

# Directives

## rxFormItem

Creates a field row wrapped in a label. Used for fields which include a single input/field.

## rxFormFieldset

Creates a field row wrapped in a fieldset. Used for fields which include multiple inputs (e.g. rxFormOptionTable).

## rxFormOptionTable

Given an data object and an additional optional object for column labels, rxFormOptionTable creates a series of radio or checkbox buttons. 

### Attributes

- `type`: Values `radio` or `checkbox` are required.
- `required`: For checkboxes, a `true` value means there must be at least one checkbox checked.
- `columns`: A data object listing column copy, include labels and keys. Expressions are allowed; see the samples.
- `data`: A data object to prefill the radio/checkbox collection. For checkboxes, checked values default to true unless `value` and `falseValue` attributes are given. See the samples.
- `model`: The AngularJS model to tie all radios/checkboxes together.
- `field-id`: The ID of the elements.
- `empty-message`: (string) A default message if the data attribute is empty. 