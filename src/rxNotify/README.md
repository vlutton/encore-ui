[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Service (rxNotify) and Directives (rxNotification and rxNotifications) for displaying status messages on a page.

## Using rxNotification as a State Message

There may be situations where you will need to use the styling/markup of rxNotify's messaging queue in status messages of your own - for example, a modal window which asks if you want to delete an object, with the appropriate warning or error flags. If this is the case, we recommend using the `rx-notification` directive in your views (note difference of `rx-notifications`).

> `<rx-notification type="warning">This is a warning message!</rx-notification>`

For all notification types, please look below under Message options, under `type`.

Another situation that you might encounter is adding a notification to the default stack but needing to do it via the template.  With the `stack` parameter you're allowed do define a notification and have it get added via `rxNotify.add`:

> `<rx-notification type="error" stack="page">`

>> `   This is an error message being added to the "page" stack with <strong>Custom</strong> html.`

> `</rx-notification>`

## Adding a New Message Queue via rxNotify

To add a new message to a stack, inject 'rxNotify' into your function and run:

> `rxNotify.add('My Message Text');`

This will add a new message to the default stack ('page') with all default options set. To customize options, pass in an object as the second argument with you specific options set:

> `rxNotify.add('My Message Text', {`

>>    `stack: 'custom',`

>>    `type: 'warning'`

> `});`

## Message options

------

- **`type`**: *Message type.*

    > Default: `'info'`

    *Other values*: `'warning'`, `'error'`, `'success'`

------

- **`timeout`**: *Time (in seconds) for message to appear.*

    > Default: `-1` (Message displays indefinitely)

    *Other values*: Any positive integer

------

- **`dismissable`**: *Whether a user can dismiss the message via an 'x' icon.*

    > Default: `true`

    *Other values*: `false`

------

- **`repeat`**: *Whether the message should be allowed to appear more than once in the stack.*

    > Default: `true`

    *Other values*: `false`

------

- **`loading`** *Replaces type icon with spinner. Removes option for use to dismiss message.*

    > Default: `false`

    *Other values*: `true`

    You usually want to associate this with a 'dismiss' property.

    **Example**:


    > `rxNotify.add('Loading', {`

    >>  `loading: true,`

    >>  `dismiss: [$scope, 'loaded']`

    > `});`

    > `var apiCallback = function (data) {`

    >>  `$scope.loaded = true;`

    >>  `// do something with the data`

    > `}`

    > `myApiCall(apiCallback);`

------

- **`show`**: *When to have the message appear.*

    > Default: `'immediate'`

    *Other values:*

    > `'next'`: Show message after the next route change

    > `[scope, 'property']`:

    >> Pass in a property on a scope to watch for a change. When the property value equals true, the message is shown.

    **Example**:

    > `$scope.loaded = false;`

    > `rxNotify.add('Content loaded!', {`

    >>  `show: [$scope, 'loaded']`

    > `});`

    > `$timeout(function () {`

    >>  `$scope.loaded = true;`

    > `}, 1500);`

------

- **`dismiss`**: *When to have the message disappear.*

    > Default: `'next'` (Dismiss message after the next route change)

    *Other values:*

    > `[scope, 'property']`:
    >>    Pass in a property on a scope to watch for a change. When the property value equals true, the message is dismissed.

    **Example**:

    > `$scope.loaded = false;`

    > `rxNotify.add('Loading Content', {`

    >>  `dismiss: [$scope, 'loaded']`

    > `});`

    > `$timeout(function () {`

    >>  `$scope.loaded = true;`

    > `}, 1500);`

------

- **`ondismiss`**: *A Function that should be run when message is dismissed.*

    > Default: `_.noop`

    *Other values*: `function () { ... }`

------

- **`stack`**: *Which message stack the message gets added to.*

    > Default: `'page'`

    > *Other values:* Any string

    **Example**:

    > `rxNotify.add('Username required', {`

    >>  `type: 'error',`

    >>  `stack: 'loginForm'`

    > `});`

    > `<rx-notifications stack="loginForm"></rx-notifications>`

------

## Dismissing a message programatically

Most messages are dismissed either by the user, a route change or using the custom 'dismiss' property.

If you need to dismiss a message programmaticaly, you can run **`rxNotify.dismiss(message)`**, where message is the message object to dismiss.

If you don't have the full message object, passing in the Message ID (which is returned from **`rxNotify.add`**) and the stack the message is in: **`rxNotify.dismiss('42', 'page')`**.

## Stacks

Stacks are just separate notification areas. Normally, all messages created will go to the 'page' stack, which should be displayed at the top of the page. It's used for page-level messages.

You can also create custom stacks for speficic notification areas. Say you have a form on your page that you want to add error messages to. You can create a custom stack for this form and send form-specific messages to it.

## Using the Page Stack

The default notification stack is added by default to the page template, so it should be ready to use without any work (unless the app uses a custom template). The HTML to add the default stack to the page is:

> `<rx-notifications></rx-notifications>`

Note that a 'stack' attribute does not need to be defined.

## Creating a Custom Stack

See 'stack' under 'Message options'

## Clearing all messages in a stack

You can clear all messages in a specific stack programmatically via the **`rxNotify.clear`** function. Simply pass in the name of the stack to clear: **`rxNotify.clear('page')`**.

## rxPromiseNotifications

It's a common pattern with API requests that you'll show a loading message, followed by either a success or failure message depending on the result of the call. rxPromiseNotifications is the service created for this pattern. See the API docs for more information on how to call/use rxPromiseNotifications.
