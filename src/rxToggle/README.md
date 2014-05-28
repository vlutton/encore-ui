[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This component provides and attribute to handle toggling a boolean scope property for hide/show purposes. Normally used in conjunction with ng-show to toggle hidden content. See the collapse functionality in 'rxApp' for a real-world use.

## Future plans

In conjunction with rxToggle, it would be helpful to have an attribute that binds the visibility state of an element with an event, so that when an event is fired from a component of the same type, it hides all other components of that time. For example, if a pop-up menu appears on click of a 'gear' component, it should hide any other existing pop-up menus currently showing.