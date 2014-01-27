# Encore UI Developer Setup

If this is your first time, you'll need to set up your coding environment to be able to build Encore UI and work with git.

## Preparing your environment

1. Install git

Many Mac OS X and Linux systems already have git installed. If your system doesn't, see [YUI's 'How to Set Up Your Git Environment'](http://yuilibrary.com/yui/docs/tutorials/git/) for instructions.

2. Install Node.js

[Download and install Node.js](http://howtonode.org/how-to-install-nodejs) if you don't already have it installed. All of Encore UI's build tools rely on Node.js.

3. Install NPM

NPM is used to manage Node.js dependencies. If you don't already have it installed, follow [the NPM installation instructions](http://howtonode.org/introduction-to-npm) to get a copy.

4. Install Bower

[Bower](http://bower.io) is used to manage UI dependencies for use within the Encore application. Run `npm install -g bower` to install Bower.

5. Install Grunt

[Grunt](http://gruntjs.com/) is used to automate the UI build and test tasks for Encore. Run `npm install -g grunt-cli` to install Grunt.

## Initial Encore Build

If you haven't already, clone the Encore repo.

`git clone git@github.com:rackerlabs/encore-ui.git`

Once downloaded, go into the new directory:

`cd encore-ui`

Finally, install the dependencies needed by Encore UI using NPM and bower:

`npm install`
`bower install`

<!-- Rework once the server/build process for a dev is determined
## Running Encore UI

Run the following command:

`grunt server`

A new browser tab should automatically open with the Encore website running in it. To log in to the website, use your Rackspace ID & RSA Pin + Token.

### 'Stubbed' Server

In order to speed development of the UI, a stubbed/mock version of the API server has been set up. This server doesn't actually have any functionality to it, aside from accepting requests and responding with some fake data.

To run/use this mock server (instead of using the full-blown API server), use the following command:

`grunt server:stubbed:watch`

This will be run in place of the normal `grunt server` command. To access the server, load `http://localhost:9000` in a browser tab.

To log in to the website, use these details to load the mock account:
Username: user
Password: pass

Note that a lot of pages aren't mocked out. It's usually a safe bet that the first link/option on a page is the one that's mocked out.
-->

## Creating a New Component

### Component Scaffolding

In order to promote consistency between components, and make it easier to create them, we use Grunt to provide scaffolding for new components.

In order to take advantage of the scaffolding, you need to install grunt-init  globally.

`npm install -g grunt-init`

With grunt-init now installed, navigate to the `src` directory in Encore UI.

Then create a new component folder and navigate into it, **with the name of your component in camelCase**. (e.g. `mkdir myTestComponent && cd myTestComponent`)

Once created, from that folder, run `grunt-init ../../grunt-tasks/component-template/`

Answer the questions prompted, let the task complete, and your new component folder should be ready for you to start coding away at. That's it.

### Stability Index

Because we're focused on delivering fast and continually improving, some components may be less stable/polished than others. To help with this, we're following the pattern set forth by the [Node Stability Index](http://nodejs.org/api/documentation.html#documentation_stability_index). To quote:

"Throughout the documentation, you will see indications of a section's stability. The Node.js API is still somewhat changing, and as it matures, certain parts are more reliable than others. Some are so proven, and so relied upon, that they are unlikely to ever change at all. Others are brand new and experimental, or known to be hazardous and in the process of being redesigned."

Each component should be marked with a stability value. This should reflect where it is in its lifecycle. All components should start as experimental, and then move towards stable as it's polished. You can always find the stability index of a component in the README.md doc in the component directory.