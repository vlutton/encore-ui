[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Service for managing the page titles. 

Two methods are available for setting the page title. The first is `setTitle()`, which simply sets the title to whatever raw string is passed in.

The second is `setTitleUnsafeStripHTML()`. This will strip any HTML tags from the string, and set the title to the result. This uses
the [technique found here](http://stackoverflow.com/questions/5002111/javascript-how-to-strip-html-tags-from-string). Note the caveats
listed there, namely:

  1. Only tags valid within `<div>` will be correctly stripped out
  2. You should not have `<script>` within the title
  3. You should not pass `null` as the title
  4. The title must come from a trusted source, i.e. danger danger danger `<img onerror='alert(\"could run arbitrary JS here\")' src=bogus>`
