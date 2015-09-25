/**
 * @ngdoc overview
 * @name rxMetadata
 * @description
 * # rxMetadata Component
 *
 * rxMetadata contains directives to provide consistent styling for
 * the display of metadata information.
 *
 * ## Organizing Metadata into Columns
 * It is highly recommended that you make use of `<section>` elements to separate metadata information into columns.
 * The `<section>` elements will be set to a fixed width and will wrap/stack if the container cannot fit all columns 
 * in a single row.
 * 
 * <pre>
 * <rx-metadata>
 *   <section>
 *     <rx-meta label="Status" id="metaStatus">Active</rx-meta>
 *     <rx-meta label="RCN">RCN-555-555-555</rx-meta>
 *     <rx-meta label="Type">Cloud</rx-meta>
 *     <rx-meta label="Service Level">Managed &rarr; Intensive</rx-meta>
 *     <rx-meta label="Service Type">DevOps &rarr; SysOps</rx-meta>
 *   </section>
 * </rx-metadata>
 * </pre>
 *
 * ## Long Data Values
 * 
 * For data values that do not naturally break to fit the width of the column, a `.force-word-break` CSS class is 
 * available on the `<rx-meta>` element to prevent the value from overflowing to adjacent content.
 *
 * <pre>
 *   <rx-meta label="Super Long Value" class="force-word-break">
 *     A super long data value with anunseeminglyunbreakablewordthatcouldoverflowtothenextcolumn
 *   </rx-meta>
 * </pre>
 * 
 * ## Directives
 * * {@link rxMetadata.directive:rxMetadata rxMetadata}
 * * {@link rxMetadata.directive:rxMeta rxMeta}
 */
angular.module('encore.ui.rxMetadata', [])
/**
 * @ngdoc directive
 * @name rxMetadata.directive:rxMetadata
 * @restrict E
 * @description
 * Parent directive used for styling and arranging metadata information.
 *
 * <dl>
 *   <dt>Display:</dt>
 *   <dd>**block** *(full width of parent)*</dd>
 *
 *   <dt>Parent:</dt>
 *   <dd>Any HTML Element</dd>
 *
 *   <dt>Siblings:</dt>
 *   <dd>Any HTML Element</dd>
 *
 *   <dt>Children:</dt>
 *   <dd>
 *     <ul>
 *       <li>{@link rxMetadata.directive:rxMeta rxMeta}</li>
 *       <li>SECTION element</li>
 *     </ul>
 *   </dd>
 * </dl>
 *
 * It is highly recommended to use `<section>` blocks for purposes
 * of arranging information into columns.
 *
 * Each `<section>` will be 300px wide and will wrap and stack vertically
 * if the container isn't wide enought to accommodate all sections in a
 * single row.
 *
 * @example
 * <pre>
 * <rx-metadata>
 *   <section>
 *     <rx-meta label="Status">
 *       degraded; system maintenance
 *     </rx-meta>
 *   </section>
 *   <section>
 *     <rx-meta label="Field Name">Field Value Example</rx-meta>
 *   </section>
 *   <section>
 *     <rx-meta label="Another Field Name">Another Field Value Example</rx-meta>
 *   </section>
 * </rx-metadata>
 * </pre>
 */
.directive('rxMetadata', function () {
    return {
        restrict: 'E'
    };
})
/**
 * @ngdoc directive
 * @name rxMetadata.directive:rxMeta
 * @scope
 * @restrict E
 * @description
 *
 * <dl>
 *   <dt>Display:</dt>
 *   <dd>**block** *(full width of parent)*</dd>
 *
 *   <dt>Parent:</dt>
 *   <dd>
 *     <ul>
 *       <li>{@link rxMetadata.directive:rxMetadata rxMetadata}</li>
 *       <li>SECTION element</li>
 *     </ul>
 *   </dd>
 *
 *   <dt>Siblings:</dt>
 *   <dd>Any HTML Element</dd>
 *
 *   <dt>Children:</dt>
 *   <dd>Any HTML Element</dd>
 * </dl>
 *
 * @example
 * <pre>
 * <rx-metadata>
 *   <section>
 *     <rx-meta label="Status">
 *       degraded; system maintenance
 *     </rx-meta>
 *   </section>
 * </rx-metadata>
 * </pre>
 *
 * @param {String=} label Label for metadata definition/value
 */
.directive('rxMeta', function () {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'templates/rxMeta.html',
        scope: {
            label: '@'
        }
    };
});//rxMetadata
