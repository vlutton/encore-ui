[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This component is simply a reference guide to using [the angular-hotkeys plugin](http://chieffancypants.github.io/angular-hotkeys/) from within Encore-UI.

Angular-hotkeys was chosen as the solution for hotkeys from within Encore-UI apps, due to its integration into Angular, it's use of the very good 'mousetrap' library, and because it allows multiple ways to define hotkeys (through a directive, controller, route config, etc).

## Global Shortcuts

Currently there is only one global shortcut key defined (`ctrl+h`). This will collapse/expand the main menu on any page. More keys can be added as need for them is identified (suggestions welcome!).

## Identifying shortcut keys

If you provide a description, the shortcut will be defined in a helper list provided when the user presses the `?` key. Currently there is no official guidance on a design pattern to identify to end-users what particular shortcuts are outside of the standard help window.