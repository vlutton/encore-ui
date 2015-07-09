# Common Questions about EncoreUI

### Why doesn't EncoreUI utilize Twitter Bootstrap?

EncoreUI is meant to serve as a framework—both architecturally and visually speaking—for all products and projects within Encore. While on occasion we have consumed a few components from Angular Bootstrap, we try to keep that to a minimum. In cases where we do utilize Angular Bootstrap, we only bring in CSS for the component we want to add, which our designers heavily modify to ensure it has an Encore look and feel.

Bringing in Bootstrap as a whole would necessitate overriding styles to customize appearance for Encore standards, which adds to page load time. We also had concerns about Bootstrap's reliance on non-semantic classes and possible collisions with other libraries. We also felt the weight of bringing in Bootstrap CSS and Javascript when not all of it is needed for Encore. Building our own style guide, CSS, and visual design means that we can address needs as they arise in a way that suits Encore and our needs.

### Why hasn't EncoreUI switched from Grunt to using Gulp?

We have a fairly extensive build system built with grunt. Converting to gulp would require a lot of effort, and it would be difficult to validate whether all the functionality is ported correctly, so there's no obvious benefit to making the switch.

### When do releases happen? What versioning system is used?

We try to release every Friday, but depending on the number of PRs ready for release (or ones that aren't quite ready), sometimes it doesn't happen and we release early the next week. If a team has an urgent need for a release, we are open to accommodating them.

For versioning, we rougly follow the [Semantic Versioning system](http://semver.org/):
 - MAJOR version when you make incompatible API changes
 - MINOR version when you add functionality in a backwards-compatible manner
 - PATCH version when you make backwards-compatible bug fixes

### What constitutes a 'breaking change'?

A breaking change is one that *requires* users of the changed component to modify their own code.

### How are issues prioritized?

As a small team with limited resources, Encore relies on prioritization to drive development. However, EncoreUI is open source and new components or functionality may be submitted in a pull request. Still, there are times when EncoreUI's team must review or tweak design and functionality of features before they are ready to be brought in. Please see our [Contribution Guide](../CONTRIBUTING.md) if you are planning on submitting a pull request.

Those looking to have new features or designs prioritized by the team should attend the Encore Stakeholder Meeting, where developers, designers, contributors, and consumers of EncoreUI meet weekly to review recent releases, current work, and upcoming needs. This meeting is the best way to request support from EncoreUI for designs and features you need that haven't been developed yet.

E-mail the [EncoreUI mailing list](mailto:encoreui@lists.rackspace.com) if you need an invitation to the meeting.
