[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Used to perform an action on multiple items in a table.

# Styling

The styles for the table are applied just by using the directives.  There are no directives provided for the modal, but it should follow a few design conventions:
* The first view has a warning at the top, and a table listing the selected items. The table should be paginated with 8 items per page, and items may be removed via an "X" icon (see the [Delete "X" action](#/styleguide/tables)).
* In the second view, the table has a status column with text describing the state of each item, and another column with an icon to indicate the state. A [progressbar](#/components/progressbar) should be included as well as a link that opens the current page in a new tab.
* Once the process is complete a "Return to [x]" button should appear in the footer, and the progressbar should be replaced with some text indicating the process is complete.
