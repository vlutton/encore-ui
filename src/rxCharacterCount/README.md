[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This provides an attribute directive intended for adding to `<textarea>` elements. Place the `rx-character-count` attribute into your `<textarea>`, and a new
`<div>` will be added directly underneath it. This directive requires that you're using `ng-model` with your `<textarea>`

This `<div>` will watch the content of the `<textarea>`, and display how many characters are remaining. By default, 254 characters are "allowed". If there are less than 10 characters remaining, the counter will go orange. If the user enters more than 254 characters, the counter will go red.

### Optional Parameters ###
The 254 and 10 values are both configurable. To change the maximum number of characters, add a `max-characters="50"` attribute to the element. For the low bound, add `low-boundary="5"`.

### Leading and Trailing characters ###
By default, any text field using `ng-model` has `ng-trim="true"` applied to it. This means that any leading and trailing spaces/blanks in your text field will be ignored. They will not count towards the remaining character count. If you want it to count leading/trailing spaces, then just add `ng-trim="false"` to your `<textarea>`.

