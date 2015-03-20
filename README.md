[![Build Status](https://travis-ci.org/rackerlabs/encore-ui.png?branch=master)](https://travis-ci.org/rackerlabs/encore-ui) [![Coverage Status](https://coveralls.io/repos/rackerlabs/encore-ui/badge.png?branch=master)](https://coveralls.io/r/rackerlabs/encore-ui?branch=master) [![devDependency Status](https://david-dm.org/rackerlabs/encore-ui/dev-status.png)](https://david-dm.org/rackerlabs/encore-ui#info=devDependencies)

# What is EncoreUI?

EncoreUI is a library of reusable AngularJS widgets for internal Rackspace projects. While a few components are specific to Rackspace, most are generic enough to be used by any app.

# Getting Started

[A 'Getting Started' guide](./guides/getting-started.md) is available to help new projects get off the ground quickly.

# Demo App

You can see all components in action by visiting [the EncoreUI demo page](http://rackerlabs.github.io/encore-ui/).

# Support

To discuss bugs and features (or float ideas), please use [the GitHub Issues Page](https://github.com/rackerlabs/encore-ui/issues?state=open). To view the issues we're currently working on, check out the [EncoreUI Task Board](https://waffle.io/rackerlabs/encore-ui).

For technical support, we have two methods of contact. For high-level questions and requests, you can e-mail the [EncoreUI mailing list](mailto:encoreui@lists.rackspace.com). Expect a response within one working day.

If ongoing support is preferred, the EncoreUI team is available through [the EncoreUI Slack channel](https://rx-encore.slack.com/messages/framework/). One of the main reasons for using the Slack channel over e-mail is that it favors quick back-and-forth communication. You can also search the entire history of the chatroom if needed.

For access to the Slack channel, send a request through the EncoreUI mailing list.

# Prioritization

As a small team with limited resources, Encore relies on prioritization to drive development. However, EncoreUI is open source and new components or functionality may be submitted in a pull request. Still, there are times when EncoreUI's team must review or tweak design and functionality of features before they are ready to be brought in.

Those looking to have new features or designs prioritized by the team should attend the Encore Stakeholder Meeting, where developers, designers, contributors, and consumers of EncoreUI meet weekly to review recent releases, current work, and upcoming needs. This meeting is the best way to request support from EncoreUI for designs and features you need that haven't been developed yet.

E-mail the [EncoreUI mailing list](mailto:encoreui@lists.rackspace.com) if you need an invitation to the meeting.

# Common Questions about EncoreUI

### Why doesn't EncoreUI utilize Twitter Bootstrap?

EncoreUI is meant to serve as a framework—both architecturally and visually speaking—for all products and projects within Encore. While on occasion we have consumed a few components from Angular Bootstrap, we try to keep that to a minimum. In cases where we do utilize Angular Bootstrap, we only bring in CSS for the component we want to add, which our designers heavily modify to ensure it has an Encore look and feel.

Bringing in Bootstrap as a whole would necessitate overriding styles to customize appearance for Encore standards, which adds to page load time. We also had concerns about Bootstrap's reliance on non-semantic classes and possible collisions with other libraries. We also felt the weight of bringing in Bootstrap CSS and Javascript when not all of it is needed for Encore. Building our own style guide, CSS, and visual design means that we can address needs as they arise in a way that suits Encore and our needs.

### Why hasn't EncoreUI switched from Grunt to using Gulp?

We have a fairly extensive build system built with grunt. Converting to gulp would require a lot of effort, and it would be difficult to validate wheter all the functionality is ported correctly, so there's no obvious benefit to making the switch.

### When do releases happen? What versioning system is used?

We try to release every Friday, but depending on the number of PRs ready for release (or ones that aren't quite ready), sometimes it doesn't happen and we release early the next week. If a team has an urgent need for a release, we are open to accommodating them.

For versioning, we rougly follow the [Semantic Versioning system](http://semver.org/):
 - MAJOR version when you make incompatible API changes
 - MINOR version when you add functionality in a backwards-compatible manner
 - PATCH version when you make backwards-compatible bug fixes

### What constitutes a 'breaking change'?

A breaking change is one that *requires* users of the changed component to modify their own code.

# Further Reading

 - [Roadmap](./guides/roadmap.md)
 - [Contribution Guide](./CONTRIBUTING.md)
 - [Versioning Guide](./guides/versioning.md)
 - [Changelog](./CHANGELOG.md)
 - [UI Setup](./guides/ui-setup.md)
 - [Testing](./guides/testing.md)
 - [CSS Style Guide](./guides/css-styleguide.md)
 - [JS Style Guide](./guides/js-styleguide.md)
 - [Architecture](./guides/architecture.md)
 - [Task Board](https://waffle.io/rackerlabs/encore-ui)
