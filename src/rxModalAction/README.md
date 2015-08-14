[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

This provides a hook into Angular-UI Bootstrap's modal directive. It's used as a link to open a modal window.The content inside the window is blank, however you can tie this with `<rx-modal-form>` to build a modal form window (including the modal title and submit/cancel buttons).

This module has a dependency on [Angular-UI Bootstrap](http://angular-ui.github.io/bootstrap/), so if it's going to be used, Bootstrap needs to be included in your webpage.

## Template URL

Due to the complex nature of the information passed into modal windows, HTML is handled via a template (versus transcluding the content).

One benefit is that this allows for multiple actions to re-use the same template. It also allows modal content to live in a separate file, which can be helpful for maintainability if the modal HTML is complex. While this can be done via `ng-include`, it would be a little extra work for a common scenario.

## Hooks

`rxModalAction` allows you to define functions to be called at different points of the modal lifecycle.
These hooks are optional and the modal window is fully functional without any being defined.

### Pre-hook

The `pre-hook` function is called before the modal window is shown.  Use a this to populate field information inside of the modal.
This is useful when you have information you don't want loaded when the page is first opened, but do need for the modal.
It is also useful for dynamic information that is based on actions taken.

### Post-hook

The `post-hook` function is called after the modal is submitted.  A `post-hook` is useful to take actions based upon input in the modal.
For example, you can use the user input that gets entered to send API requests with specific JSON data.
Or you can simply run a pre-defined API call (assuming the modal is a simple confirmation dialog).

### Dismiss-hook

The `dismiss-hook` function is called after the modal is closed without submitting.
This may happen via any of the following scenarios:

* Clicking the "Cancel" button
* Clicking the "X" button in the top right
* Pressing `ESC`
* Explicitly calling `$modalInstance.dismiss()` in your javascript logic

This hook is useful for making changes to UI state when the user wants to cancel the given action.  For example, you may use this to return an indeterminate component to a previous state (e.g. toggle switches).

## rxModalForm

The `<rx-modal-form>` directive is helpful for providing a common format to forms inside modals (hence the name). It allows the following configurations:

- Title
- Subtitle
- isLoading - whether the modal form should have a 'loading' message by default. This is usually tied in with a `pre-hook` to load data
- submitText - Override of the 'submit' button text
- cancelText - Override of the 'cancel' button text
- returnText - Override of the 'return' button text

This directive also provides an 'autofocus' mechanism, which will move the keyboard focus cursor to the first 'tabbable' input available in the form.

## rxModalFooter

When a modal has multiple views or kicks off a process that should be tracked within the modal, the `<rx-modal-footer>` directive should be used.  Its attributes are:

- state
- global - This is just a flag and takes no value.

Modal Footers should be defined in the same template as the Modal Form unless the footer is global, in which case it should be loaded in `module.run()`.  Global footers can be used in any subsequent modal by changing to the state they were defined with.

The modal's controller also inherits the `setState()` method on the scope, which should be used to toggle different views or footers. See the Multi-View Example of this design pattern's usage.
The default `editing` state shows the standard submit and cancel buttons, and the only other state provided by the framework is `complete` (showing the return button).
