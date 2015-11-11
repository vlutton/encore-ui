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
angular.module('encore.ui.rxMetadata', []);
