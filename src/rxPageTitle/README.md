[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Service for managing the page titles. The factory will attempt to strip out any HTML from the titles using
the [technique found here](http://stackoverflow.com/questions/5002111/javascript-how-to-strip-html-tags-from-string). Note the caveats
listed there, namely:

  1. Only tags valid within `<div>` will be correctly stripped out
  2. You should not have `<script>` within the title
  3. You should not pass `null` as the title
  4. The title must come from a trusted source, i.e. danger danger danger `<img onerror='alert(\"could run arbitrary JS here\")' src=bogus>`
