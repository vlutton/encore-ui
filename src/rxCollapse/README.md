[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

The rxCollapse element can be used to display and hide content. It can be configured to show as either expanded or collapsed on page load. A double chevron is used as a toggle to show/hide the inner contents, while keeping the header and border visible.

### See More/See Less

- This pattern was developed for areas displaying metadata that may be short on screen real estate, as a way to hide data on load that is not as important to the user in the context where they are presented.
- This pattern is not very responsive-friendly, since as browser width decreases, columns will wrap. As columns wrap, the "See More" rxCollapse elements get lost in the new context, which is bad for user experience.
- To avoid the problem described above, "See More" rxCollapse elements should only be used at the end of the final column present on the page, so that when the columns wrap via flexbox, "See More" is always last and doesn't get lost in between metadata key/value pairs.


### Attributes

- `title`: The title to display next to the toggle button. Remove or leave the title blank in order to enable "See More / See Less" version of rxCollapse.
- `expanded`: Initially expanded or collapsed.  Default is expanded.
