[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Filter to parse an age based on a date in the past.

**Note: This component requires [moment.js](http://momentjs.com/) be loaded.**

This function has several different ways you can use it:

1. You can just have it use the default abbreviated method and it truncates it
   to the two largest units.
2. You can also pass in a second value of `true` and have it expand the units
   from the first letter to their full word representation.
3. Or you can pass in a number from `1` to `3` as the second value to allow for
   different amounts of units.
4. **OR** you can pass in a number as the second argument and `true` as the
   third argument to combine these two effects.
