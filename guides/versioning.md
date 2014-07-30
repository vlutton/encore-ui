# Encore UI Versioning

In order to help prevent regressions and allow applications time to incorporate any breaking changes, Encore UI uses a 'pull' model for versioning. In order to get the latest version of Encore UI, the application must update their version reference (versus Encore UI automatically pushing down the latest version).

Encore follows the [Semanatic Versioning](http://semver.org/) model for releases.

## Starting a new version

Versions aren't necessarily started. Instead, new code is built on top of an existing version. This does not mean that the new code replaces the existing version, just that a new version isn't created until the code is ready to be released to production. This enables us to decide what type of version change should occur after the code has been written, versus decided before.

This does mean that the master branch will contain updates not available in the latest version in production. In order to use the newest code, update your reference to pull from the staging site.

## Releasing a version

A new version is released everytime a push to production (our CDN) occurs. This will normally happen at least once per week. There is no specific criteria for a version to be released, other than features being ready for deployment.

Production deploys are done manually through the command line. To push to production, run `grunt shipit:[versionType]` (replacing [versionType] with 'major', 'minor' or 'patch').

So, if you wanted to increment from v0.1.0 to v0.1.1, you would run `grunt shipit:patch`.

**Note: This command is only intended to be used by core contributors. It will not work if you do not have the right permissions.**

A git tag is automatically created for every new version and each version is pushed to the Bower repo automatically through the `shipit` command.

### Production CDN

Production releases are hosted on Rackspace's Cloud Files CDN. The URL for production files is:
https://95c7050854423f809e66-6999ba0e7a4f47d417515fb3f08fa9b8.ssl.cf1.rackcdn.com/encore-ui-[version.number].js

See [the main readme](../README.md) for a link to the latest build.

## Stability Index

Because we're focused on delivering fast and continually improving, some components may be less stable/polished than others. To help with this, we're following the pattern set forth by the [Node Stability Index](http://nodejs.org/api/documentation.html#documentation_stability_index). To quote:

> Throughout the documentation, you will see indications of a section's stability. The Node.js API is still somewhat changing, and as it matures, certain parts are more reliable than others. Some are so proven, and so relied upon, that they are unlikely to ever change at all. Others are brand new and experimental, or known to be hazardous and in the process of being redesigned.

Each component is marked with a stability value. This reflects where it is in its lifecycle. All components should start as experimental and then move towards stable as it's polished. You can always find the stability index of a component in the README.md doc in the component's directory.
