[![Build Status](https://travis-ci.org/rackerlabs/encore-ui.png?branch=master)](https://travis-ci.org/rackerlabs/encore-ui) [![Coverage Status](https://coveralls.io/repos/rackerlabs/encore-ui/badge.png?branch=master)](https://coveralls.io/r/rackerlabs/encore-ui?branch=master) [![devDependency Status](https://david-dm.org/rackerlabs/encore-ui/dev-status.png)](https://david-dm.org/rackerlabs/encore-ui#info=devDependencies)

# Using Encore UI

To use Encore UI in your app, do the following:

1. Include the Encore CSS file in the `<head>` of your index.html:

    ```
    <link rel="stylesheet" href="https://95c7050854423f809e66-6999ba0e7a4f47d417515fb3f08fa9b8.ssl.cf1.rackcdn.com/0.2.0/encore-ui.min.css">
    ```

2. Install and include the dependencies listed in [bower.json](./bower.json) (items listed in devDependencies are not required)

3. Include the Encore JS file (**Dependencies must be included before this line**):

    ```
    <script src="https://95c7050854423f809e66-6999ba0e7a4f47d417515fb3f08fa9b8.ssl.cf1.rackcdn.com/0.2.0/encore-ui-tpls.min.js"></script>
    ```

4. Add 'encore.ui' as a dependency in your app.js module declaration. For example:

    ```
    angular.module('myApp', ['encore.ui']);
    ```

# Demo App

You can see all components in action by visiting [the Encore UI demo page](http://rackerlabs.github.io/encore-ui/0.1.0/).

# Further Reading

 - [Contribution Guide](./CONTRIBUTING.md)
 - [Versioning Guide](./docs/versioning.md)
 - [Changelog](./CHANGELOG.md)
 - [UI Setup](./docs/ui-setup.md)
 - [Architecture](./docs/architecture.md)
 - [Testing](./docs/testing.md)
 - [CSS Style Guide](./docs/css-styleguide.md)
 - [JS Style Guide](./docs/js-styleguide.md)