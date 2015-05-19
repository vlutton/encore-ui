[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

This component provides styles and a demo for the [the Angular-UI Bootstrap Typeahead plugin](https://github.com/angular-ui/bootstrap/tree/master/src/typeahead), which is included as a dependency for EncoreUI.

## Usage

Usage is the exact same as demoed on the Angular-UI Bootstrap site. See [the Angular-UI Bootstrap Docs](http://angular-ui.github.io/bootstrap/) for further guidance on usage and configuration of this component.

A feature has been added that shows the list of options when the input receives focus.  This list is still filtered according to the input's value, except when the input is empty.  In that case, all the options are shown.  To use this feature, add the `allowEmpty` parameter to the `filter` filter in the `typeahead` attribute.  See the demo for an example.
