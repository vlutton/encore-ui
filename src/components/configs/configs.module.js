/**
 * @ngdoc overview
 * @name configs
 * @description
 * # configs Component
 *
 * Common configs used throughout Encore.
 *
 * Most of the configs are `.constant` or `.value`, but `routesCdnPath` is configured
 * as a `.provider`. This is to allow users to override the URL used when in a
 * local/staging environment.
 *
 * The main reason for that is to let people test local versions of
 * [the encore-ui-nav JSON file](https://github.com/rackerlabs/encore-ui-nav/blob/staging/src/encoreNav.json)
 * before submitting pull requests to that repository.
 *
 * For example, to point to a local `mynav.json` file, put the following into your `app.js`:
 *
 * <pre>
 * .config(function (otherdependencies, ..., routesCdnPathProvider) {
 *     // Other config stuff you need to do
 *     routesCdnPathProvider.customURL = 'mynav.json';
 * });
 * </pre>
 *
 * The `mynav.json` file will likely have to live in your `app/` folder, depending
 * on your configuration.
 *
 * If you do set `customURL` to a non `null` value, then `routesCdnPath.hasCustomURL`
 * will automatically get set to `true`. `hasCustomURL` is intended only for the framework
 * to use, but we are documenting it in case you find your own use case for it.
 *
 * ## Services
 * * {@link configs.service:routesCdnPath routesCdnPath}
 */
angular.module('encore.ui.configs', []);
