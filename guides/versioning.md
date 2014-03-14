# Encore UI Versioning

In order to prevent regressions and allow applications time to incorporate any breaking changes, Encore UI uses a 'pull' model for versioning. In order to get the latest version of Encore UI, the application must update their version reference (versus Encore UI automatically pushing down the latest version).

Encore follows the [Semanatic Versioning](http://semver.org/) model for releases.

## Starting a new version

Versions aren't necessarily started. Instead, new code is built on top of an existing version. This does not mean that the new code replaces the existing version, just that a new version isn't created until the code is ready to be released to production. This enables us to decide what type of version change should occur after the code has been written, versus decided before.

This does mean that the master branch will contain updates not available in the latest version in production. In order to use the newest code, update your reference to pull from the staging site.

## Releasing a version

A new version is released everytime a push to production occurs. This will normally happen about once a week.

Production deploys are done manually through the command line. To push to production, run `grunt shipit:[versionType]` (replacing [versionType] with 'major', 'minor' or 'patch').

So, if you wanted to increment from v0.1.0 to v0.1.1, you would run `grunt shipit:patch`.

**Note: This command is only intended to be used by core contributors. It will not work if you do not have the right permissions.**

A git tag is automatically created for every new version and each version is pushed to the Bower repo.

## Environments

Both staging and production are hosted on Rackspace's Cloud Files CDN in (separate containers). The only difference between the two is that staging has the latest builds, while production only gets official releases.

### Staging

The base URL for staging files is:
https://21d623946965b8ac8d7e-30fbdb0f8462ba8c24fc36921885eab8.ssl.cf1.rackcdn.com/

A release to staging is automatically done through the Travis deploy script, with a build number appended to the base version. For example, a staging release built off of version 0.10.0 would be available via:

https://21d623946965b8ac8d7e-30fbdb0f8462ba8c24fc36921885eab8.ssl.cf1.rackcdn.com/encore-ui-0.10.0-1.js

### Production

The URL for production files is:
https://95c7050854423f809e66-6999ba0e7a4f47d417515fb3f08fa9b8.ssl.cf1.rackcdn.com/encore-ui-[version.number].js

See [the main readme](../README.md) for a link to the latest build.