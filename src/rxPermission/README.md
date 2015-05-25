[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Service and directive for mananging permissions in EncoreUI.

A factory `Permission` is provided, for working with roles, and a directive `rxPermission` for excluding DOM content based on roles.

# `Permission`

`Permission` exposes three methods.

## `getRoles()`
This method takes no arguments, and returns all the roles tied to the user, in the exact format available in their Session token.

## `hasRole(roles)`
Given an array of roles (strings), this method returns `true` if the user has at least one of those roles, and `false` otherwise.

## `hasAllRoles(roles)`
Given an array of roles (strings), this method returns `true` if the user has _all_ of the roles, and `false` otherwise.

# `rxPermission`
This directive can be used to hide or show content based on whether or not the user has the specified role. See the demo below for an example.
