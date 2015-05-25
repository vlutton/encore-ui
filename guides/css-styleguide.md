# Encore CSS Coding Standards

## Acknowledgements:

Most of these standards are based off of the guidelines provided by [SMACSS](http://smacss.com/) and [OOCSS](http://coding.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/). Reading up on these materials will give you a much greater understanding of why these rules were chosen.

## Basic Rules:

1. **Use class names for your selectors**

    Many style guides focus around preventing classitis by depending on HTML elements for selectors. While using only "semantic" HTML is a neat idea, [it doesn't scale well](http://www.stubbornella.org/content/2011/04/28/our-best-practices-are-killing-us/).

    Therefore, use of HTML elements or id's in a selector is strongly discouraged, as they create uneccesssary specificity.

    *Scenario #1*

    Use `.blog-article {}` instead of `article {}`.

    Yes, sometimes it's "uglier" to use article as a class, but it's much more re-usable than relying on the specific HTML `article` element. Along that same logic, [don't style heading elements](http://www.stubbornella.org/content/2011/09/06/style-headings-using-html5-sections/), but [use class names instead](http://blog.kevinlamping.com/post/46259129477/normalize-css-and-default-heading-styles).

        <h1 class="alpha">My Big Site Title</h1>
        <h2 class="alpha">My Just as Big Site Tagline</h2>
        http://csswizardry.com/2012/11/code-smells-in-css/

    *Scenario #2*

    `.login-form` instead of `#login-form`

    Here, instead of using an ID, we use a class name. While there may only ever be one login form on a page, using a class name gives us much more flexibility for the future. **This is probably the biggest change that you'll need to make when coding CSS according to this style guide.**

    For a great example on how using IDs in selectors can cause major re-usability problems, take a look at the 'twitter widget' example in the post ["When using IDs can be a pain in the class..."](http://csswizardry.com/2011/09/when-using-ids-can-be-a-pain-in-the-class/)

2. **[Keep CSS selectors short](http://csswizardry.com/2012/05/keep-your-css-selectors-short/)**

    CSS selectors should have no more than 3 qualifiers.

    Since we use LESS, it's easy to create long selectors without realizing it (through too much nesting of CSS). As a general rule, [**don't nest selectors more than 2 deep**](http://www.youtube.com/watch?v=GhX8iPcDSsI).

3. Avoid `!important` AT ALL COSTS

    Nothing reduces the re-usability and flexibility of your CSS like using `!important`. Chances are, if you're finding yourself needing to use it, the CSS you're overriding is too specific and needs to be refactored using the previous rules.

    If you simply can't avoid using `!important`, you **MUST** include a comment adjascent to its use explaining why it's necessary. This comment should explain what selectors !important is overriding and why those selectors can't be changed to be less specific.

4. Use CSS Lint

    If the previous three rules seem too complicated or annoying to have to remember, just run your code through [CSS Lint](http://csslint.net/#warnings=display-property-grouping,duplicate-properties,empty-rules,known-properties,text-indent,vendor-prefix,fallback-colors,star-property-hack,underscore-property-hack,bulletproof-font-face,font-faces,duplicate-background-images,regex-selectors,universal-selector,unqualified-attributes,zero-units,overqualified-elements,shorthand,floats,font-sizes,ids,important,outline-none,qualified-headings,unique-headings) when committing.

## Format

**Note: This section pulled from [The Principles of writing consistent, idiomatic CSS](https://github.com/necolas/idiomatic-css/blob/master/README.md#format)

This code format ensures that code is: easy to read; easy to clearly
comment; minimizes the chance of accidentally introducing errors; and results
in useful diffs and blames.

* Use one discrete selector per line in multi-selector rulesets.
* Include a single space before the opening brace of a ruleset.
* Include one declaration per line in a declaration block.
* Use one level of indentation for each declaration.
* Include a single space after the colon of a declaration.
* Use lowercase and shorthand hex values, e.g., `#aaa`.
* Use double quotes consistently.
  e.g., `content: ""` or [type="text"]
* Quote attribute values in selectors, e.g., `input[type="checkbox"]`.
* _Where allowed_, avoid specifying units for zero-values, e.g., `margin: 0`.
* Include a space after each comma in comma-separated property or function
  values.
* Include a semi-colon at the end of the last declaration in a declaration
  block.
* Place the closing brace of a ruleset in the same column as the first
  character of the ruleset.
* Separate each ruleset by a blank line.

```css
.selector-1,
.selector-2,
.selector-3[type="text"] {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: block;
    font-family: helvetica, arial, sans-serif;
    color: #333;
    background: #fff;
    background: linear-gradient(#fff, rgba(0, 0, 0, 0.8));
}

.selector-a,
.selector-b {
    padding: 10px;
}
```

## Class Naming

In order to create consistent class names, it's encouraged to use the naming defined at [semantic-ui.com](http://semantic-ui.com). This is especially true for components that are meant to be re-usable like icons or alert boxes.

## Frameworks

### Grids/Layout

EncoreUI currently does not prescribe a specific grid system that apps should use. We leave the choice of framework up to the developers of the app and what fits them best.

For layout needs (e.g. rxApp and rxForm), Encore uses either `flexbox` and `floats`, respectively. While relatively new, flexbox has proven to be very powerful and will likely replace floats as the defacto solution for layouts in the EncoreUI framework.

### Recommended Libraries

- http://purecss.io/grids/
- http://flexboxgrid.com/
