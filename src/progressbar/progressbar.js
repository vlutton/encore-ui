/**
 * @ngdoc overview
 * @name progressbar
 * @description
 * # progressbar Component
 *
 * This component may be used to provide feedback on the progress of a workflow or action.
 *
 * <pre>
 * <div ng-controller="progressbarCtrl">
 *   <div layout="row">
 *     <div flex="67">
 *       <progressbar class="progress-striped active" value="45" max="100"></progressbar>
 *     </div>
 *   </div>
 *   <div layout="row">
 *     <div flex="67">
 *       <progressbar class="progress active" max="3" value="3">3 of 3 servers processed
 *       </progressbar>
 *     </div>
 *   </div>
 * </div>
 * </pre>
 *
 * Encore Framework utilizes Angular Bootstrap *progressbar*. See the
 * [Angular Bootstrap page](http://angular-ui.github.io/bootstrap/#/progressbar) for more details.
 *
 */
angular.module('encore.ui.progressbar', []);
