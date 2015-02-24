## Bower Publishing

EncoreUI is published through Bower so that it can be installed locally as a Bower dependency. This is an alternative to the normal CDN installation route.

In order to avoid cluttering up PR's with build files, all Bower build files are hosted [in a separate 'EncoreUI Bower' repo](https://github.com/rackerlabs/encore-ui-bower/). This repo is what's registered with Bower, so it must be updated on every release of EncoreUI.

Updates to this repo have been automated through the `grunt shipit` command. When `shipit` is run, it builds all relevant files, pushes to the public CDN, but also build the corresponding files for Bower and pushes a new version to this separate repo. You must have push privileges to run this.

## Note

Ideally, this would all be handled within the same repo and no separate push to bower would have to take place. This should be investigated further as time permits. A good starting point is [Angular UI Publisher](https://github.com/angular-ui/angular-ui-publisher).

# Local Dev with Bower Link

If you find yourself working on an Encore app and need to work with an EncoreUI component that hasn't been released in an official version, you can use `bower link` to link a local install of EncoreUI (with the latest/greatest) with your app's bower directory. For more information, read the [Live Development of a Bower Component](https://oncletom.io/2013/live-development-bower-component/) blog post.
