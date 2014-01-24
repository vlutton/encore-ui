# How to contribute

We want to keep it as easy as possible to contribute changes Encore. There are a few guidelines that we need to follow so that we can have a chance of keeping on top of things.

## Bugs & Issues

Please submit any bugs you encounter when using Encore UI to our [Github Issues Tracker](https://github.com/rackerlabs/encore-ui/issues).

When submiting a bug report, please **include a set of steps to reproduce the issue** and any related information (browser, OS, etc). If we can't reproduce the issue then it makes fixing it much more difficult.

## Adding/Updating Code

If you haven't already, let the Racker Tools team know what your plans are. This is important so that time isn't spent by separate teams doing the same thing, and so that the team can get an initial round of feedback in before coding starts.

### Get feedback early and often

An **API review** validates your initial approach

A **design review** validates your high-level architecture

A **code review** validates your implementation details

## Encore UI Developer Setup

[Encore UI Developer Setup](./docs/ui-setup.md) - How to install the Encore UI codebase

## Coding Standards

[CSS Style Guide](./docs/css-styleguide.md)

[JavaScript Style Guide](./docs/js-styleguide.md)

## Code Contribution Process

The process for any code updates follows [the GitHub Flow model](http://scottchacon.com/2011/08/31/github-flow.html).

To sum up:

1. Create a new branch in your local repo
2. Commit to that branch
3. Push branch up to Github
4. Submit PR to for review
5. Once reviewed and feedback given (and implemented), we will merge the branch to master

## 3rd-party Libraries

Any libraries added to the project must be pre-approved with the UI team.

## Tips on Committing Your Code

### Diff Before Every Commit

Get into the habit of running git diff or git diff --cached before every commit. This helps ensure no unwanted changes sneak in. Also, check for unnecessary whitespace with `git diff --check`.

### Commits Should Be Granular

You should keep each commit as granular as possible. For instance, do not check in 2 bug fixes in one commit -- separate them out into 2 commits.

### Commits Follow a Common Format

We use [the same commit format that the Angular Team follows](https://docs.google.com/document/d/1rk04jEuGfk9kYzfqCuOlPTSJw3hEDZJTBN5E5f1SALo/edit). Any commits that don't follow this format will be rejected.

## Testing

* Run _all_ the tests to assure nothing else was accidentally broken.
* Unit Tested - Minimum coverage requirement - 80% (simple controllers/services may not need to be unit tested, depending on how basic their logic is)
* Midways tests also need to be created for any new components

[More on testing](./docs/testing.md)

## Submitting changes

Before submitting any changes, make sure the master branch is merged locally into your branch (using [Git rebase](http://git-scm.com/book/en/Git-Branching-Rebasing) is preferred). Once done, push your branch up to Github and [submit a Pull Request](https://help.github.com/articles/using-pull-requests).

### Pull Request Minimum Requirements

- Complete documentation (a docs subfolder with working examples and [ngdocs](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation)), along with inline code comments as beneficial
- Unit tests with 80% line coverage
- Midways tests for all new UI functionality
- Proper commit logs
- Passes JSHint & CSSLint

Once a pull request has been submitted, you simply need to wait for the Encore UI team to respond. Every pull request sends an e-mail out to the team, so there is no need to send any further communication to the team. If the pull request is urgent, that needs to be communicated before the pull request is sent.

We like to at least comment on, if not accept, pull requests within three business days (and, typically, one business day). We may suggest some changes or improvements or alternatives, so **make sure there is time for review in your release plan**.

## Right to Revert

Once the contribution has been merged into the repo, if any issues arise in the integration environment or upon subsequent feedback, the contribution may be reverted.