[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

The `rxSearchBox` directive behaves similar to the HTML "search" input type.  When the search box is not empty, an "X" button within the element will allow you to clear the value.  Once clear, the "X" will disappear.  A disabled search box cannot be cleared of its value via the "X" button because the button will not display.

Though it is described as a search box, you can also use it for filtering capabilities (as seen by the placeholder text in the "Customized" demo).

## Options

| Options | Required? | Description |
| ------- | --------- | ----------- |
| **`ng-model`** | **required** | Model value to bind the search value |
| `ng-disabled` | *optional* | Boolean value to enable/disable the search box |
| `rx-placeholder` | *optional* | String to override the default placeholder (`Search...`) |

## Styling
You can style the `<rx-search-box>` element via custom CSS classes the same way you would any HTML element. 

See the "Customized" search box in the demo for an example.