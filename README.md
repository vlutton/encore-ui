[![Build Status](https://travis-ci.org/rackerlabs/encore-ui.png?branch=master)](https://travis-ci.org/rackerlabs/encore-ui) [![Coverage Status](https://coveralls.io/repos/rackerlabs/encore-ui/badge.png?branch=master)](https://coveralls.io/r/rackerlabs/encore-ui?branch=master) [![devDependency Status](https://david-dm.org/rackerlabs/encore-ui/dev-status.png)](https://david-dm.org/rackerlabs/encore-ui#info=devDependencies)

# What is Encore-UI?

Encore-UI is a library of reusable AngularJS widgets for internal Rackspace projects. At this point, it may not usable for non-Rackspace projects. However, it is a great resource for learning our best practices.

# Demo App

You can see all components in action by visiting [the Encore-UI demo page](http://rackerlabs.github.io/encore-ui/).

# Support

The preferred method of contacting the Encore-UI team is through [the Encore-UI public HipChat channel](http://www.hipchat.com/gb5dm7gzB). You do not need to have a registered HipChat account in order to chat; it's open to anyone with a browser.

One of the main reasons for using this channel over e-mail is that anyone on the channel can help out (versus having to be on the mailing list). It also favors quick back-and-forth communication, versus writing 100 e-mails back and forth.

You can also view the entire history of the chatroom if you have a HipChat account and are in the room via the HipChat app (under the name "Encore-UI").

If you live and die by IRC, there is also a room available on freenode.net at #encore-ui.

To discuss bugs and features, please use [the GitHub Issues Page](https://github.com/rackerlabs/encore-ui/issues?state=open). To get a better overview of what's currently being worked, check out the [Encore-UI Task Board](https://waffle.io/rackerlabs/encore-ui).

# Installation (Using Encore-UI)

## CDN

To use the Encore-UI CDN in your app, do the following:

1. Install and include the dependencies listed in [bower.json](./bower.json) (items listed in devDependencies are not required)

2. Include the Encore CSS file in the `<head>` of your index.html (before the CSS for your app):

    ```
    <link rel="stylesheet" href="https://95c7050854423f809e66-6999ba0e7a4f47d417515fb3f08fa9b8.ssl.cf1.rackcdn.com/encore-ui-0.11.2..min.css">
    ```

3. Include the Encore JS file (**Dependencies must be included before this line**):

    ```
    <script src="https://95c7050854423f809e66-6999ba0e7a4f47d417515fb3f08fa9b8.ssl.cf1.rackcdn.com/encore-ui-tpls-0.11.2..min.js"></script>
    ```

4. Add 'encore.ui' as a dependency in your app.js module declaration. For example:

    ```
    angular.module('myApp', ['encore.ui']);
    ```

## Bower

If you have a static server that you'd like to build your files off of, you can install Encore-UI via [Bower](http://bower.io):

```
bower install encore-ui
```

# Further Reading

 - [Roadmap](./guides/roadmap.md)
 - [Contribution Guide](./CONTRIBUTING.md)
 - [Versioning Guide](./guides/versioning.md)
 - [Changelog](./CHANGELOG.md)
 - [UI Setup](./guides/ui-setup.md)
 - [Testing](./guides/testing.md)
 - [CSS Style Guide](./guides/css-styleguide.md)
 - [JS Style Guide](./guides/js-styleguide.md)
 - [Architecture](./guides/architecture.md)
 - [Task Board](https://waffle.io/rackerlabs/encore-ui)
