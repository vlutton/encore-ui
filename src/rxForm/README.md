[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

The rxForm component is a set of directives used to create forms throughout Encore. These directives provide a common HTML layout and style for all form elements, which helps ensure form accessibility and makes creating new forms easier.

**NOTE**: `rxFormInput`, `rxFormRadio` and `rxFormSelect` are deprecated and will be removed in a future version. Please use rxFormItem for all your form input needs!

# Directives

## rxFormItem

Creates a field row wrapped in a label. Used for fields which include a single input/field.

## rxFormFieldset

Creates a field row wrapped in a fieldset. Used for fields which include multiple inputs (e.g. rxFormOptionTable).