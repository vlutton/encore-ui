# Encore UI Developer Setup

If this is your first time, you'll need to set up your coding environment to be able to build Encore UI and work with git.

## Preparing your environment

1. Install git

    Many Mac OS X and Linux systems already have git installed. If your system doesn't, see [YUI's 'How to Set Up Your Git Environment'](http://yuilibrary.com/yui/docs/tutorials/git/) for instructions.

2. Install Node.js

    [Download and install Node.js](http://howtonode.org/how-to-install-nodejs) if you don't already have it installed. All of Encore UI's build tools rely on Node.js.

3. Install NPM

    NPM is used to manage Node.js dependencies. If you don't already have it installed, follow [the NPM installation instructions](http://howtonode.org/introduction-to-npm) to get a copy.

4. Install NPM Dependencies
    * Short version
        `npm install -g grunt-cli bower protractor@1.0.0 mocha@1.18.2`
    * Long version
        * Install Bower
            [Bower](http://bower.io) is used to manage UI dependencies for use within the Encore application. Run `npm install -g bower` to install Bower.
        * Install Grunt
            [Grunt](http://gruntjs.com/) is used to automate the UI build and test tasks for Encore. Run `npm install -g grunt-cli` to install Grunt.
        * Install Protractor
            [Protractor](https://github.com/angular/protractor) is used to run midway UI tests in an AngularJS project. Run `npm install -g protractor@1.0.0` to install Protractor.
        * Install Mocha
            [Mocha](http://visionmedia.github.io/mocha/) is used to provide feedback during protractor tests. Run `npm install -g mocha@1.18.2` to install Mocha.
    * **Note:** in order to run the midway tests, you must pin your protractor & mocha installs to the versions above.

5. Install Selenium Server:
    * Mac
     - `brew install selenium-server-standalone` to install, `selenium-server` to run it.

    Additionally, you could allow Protractor to manage this for you, using [Protractor's built-in `webdriver-manager`](https://github.com/angular/protractor/blob/master/docs/server-setup.md#standalone-selenium-server).

6. Install PhantomJS
    * Follow [the install instructions for your OS](http://phantomjs.org/download.html).

## Initial Encore Build

If you haven't already, clone the Encore repo.

`git clone git@github.com:rackerlabs/encore-ui.git`

Once downloaded, go into the new directory:

`cd encore-ui`

Finally, install the dependencies needed by Encore UI using NPM and bower:

`npm install && bower install`

## Running Encore UI

Run the following command:

`grunt server`

You can then open `http://localhost:9001` in a new browser and view the demo app. The page will automatically refresh when the code is updated.

### Warning: EMFILE, too many open files 'src'

If you see the following [error when running `grunt server`](https://github.com/gruntjs/grunt-contrib-copy/issues/21#issuecomment-46194402):

```
Running "watch" task
Waiting...
Warning: EMFILE, too many open files 'src'
```

Run `launchctl limit maxfiles 10480 10480` in your terminal. Depending on your operating system, sometimes `launchctl limit maxfiles 2048 2048 && ulimit -n 2048` will work instead. You might also want to add that to your .bash_profile script.


## Creating a New Component

### Component Scaffolding

In order to promote consistency between components, and make it easier to create them, we use Grunt to provide scaffolding for new components.

In order to take advantage of the scaffolding, you need to install grunt-init globally:

`npm install -g grunt-init`

With grunt-init now installed, navigate to the `src` directory in Encore UI.

Then create a new component folder and navigate into it, **with the name of your component in camelCase**. (e.g. `mkdir myTestComponent && cd myTestComponent`)

Once created, from that folder, run `grunt-init ../../grunt-tasks/component-template/`

Answer the questions prompted, let the task complete, and your new component folder should be ready for you to start coding away at. That's it.
