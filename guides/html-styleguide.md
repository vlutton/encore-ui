# HTML Styleguide

## Acknowledgements:

Most of these standards are based off of the guidelines provided by
[Google](https://google.github.io/styleguide/htmlcssguide.xml#Indentation), and
current developer feedback. Reading up on these materials will give you a much
greater understanding of why these rules were chosen.

## Basic Rules:

### Use Two Space Indentations
The framework is indenting by two spaces at a time. Please do not use tabs
or mix tabs and spaces when indenting.


#### Scenario 1
```html
<ul>
  <li>List Item...</li>
</ul>
```

#### Scenario 2
This is an example of using the proper indentation with nested elements.
Each child element is nested and indented two spaces from its parent
element.

```html
<ul>
  <li>List Item
    <ul>
      <li>Nested UL List Item</li>
    </ul>
  </li>
</ul>
```

### HTML Max Line Length
The maximum line length for HTML files should be 120 characters. Review line
lengths during coding of HTML files, and break to a new line if it exceeds
120 characters. Hyperlinks are an exception to this rule. Hyperlinks can
exceed the 120 character limit and must not be broken or separated.
