[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

The rxForm component is a set of directives used to create forms throughout Encore. These directives provide a common HTML layout and style for all form elements, which helps ensure form accessibility and makes creating new forms easier.

# Directives

## rxFormItem

Creates a field row wrapped in a label. Used for fields which include a single input/field.

### Custom validator for rxFormItem

For form input validation, we have created an `.inline-error` class. You can use this, along with `ng-show` to conditionally show error messages on form inputs. An example of this is below in the demo, and looks like this:

<pre><code>
&lt;rx-form-item label="Email address" description="Must contain foo."&gt;
    &lt;input name="userEmail" type="email" ng-model="details.email" foocheck /&gt;
    &lt;div ng-show="demoForm.userEmail.$error.email" class="inline-error"&gt;Invalid email&lt;/div&gt;
    &lt;div ng-show="demoForm.userEmail.$error.foocheck" class="inline-error"&gt;Your email address must contain 'foo'&lt;/div&gt;
&lt;/rx-form-item>
</pre></code>

Angular provides its own validator when you use `type="email"`, and you can use `.inline-error` to turn email validation errors into a styled message.

You can also use this class if you define a custom validator. The example shown uses a custom `foocheck` validator. Note that it is enabled by placing the `foocheck` directive in the `input`, and using it with `ng-show="demoForm.userEmail.$error.foocheck"`

The JavaScript tab below shows how this validator was implemented, and there are plenty of examples online showing the same thing.

## rxFormFieldset

Creates a field row wrapped in a fieldset. Used for fields which include multiple inputs (e.g. rxFormOptionTable).

## rxFormOptionTable

[![deprecated](http://badges.github.io/stability-badges/dist/deprecated.svg)](http://github.com/badges/stability-badges)

**DEPRECATED - This directive has been marked as deprecated and *will be removed* in a future release of the EncoreUI framework.**

Please use [`rxOptionTable`](/#/component/rxOptionTable) as a stand-in replacement.

# Services

## rxFormUtils

Provides a set of utility functions for accessing form data
