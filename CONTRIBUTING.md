# How to contribute

We want to keep it as easy as possible to contribute changes Encore. There are a few guidelines that we need to follow so that we can have a chance of keeping on top of things.

## Bugs & Issues

Please submit any bugs you encounter when using EncoreUI to our [Github Issues Tracker](https://github.com/rackerlabs/encore-ui/issues).

When submiting a bug report, please **include a set of steps to reproduce the issue** and any related information (browser, OS, etc). If we can't reproduce the issue then it makes fixing it much more difficult.

## Adding/Updating Code

If you haven't already, let the Racker Tools team know what your plans are. This is important so that time isn't spent by separate teams doing the same thing, and so that the team can get an initial round of feedback in before coding starts.

### Criteria for New Additions

New additions to the framework are always encouraged. Here are some loose guidelines that new components should meet:

1. The component is re-usable. Multiple projects have a need for it.
3. Requirements are well defined and documented.
4. If code has been written, it meets our standards (or is close enough for an easy update).
  - If code hasn’t been written, developers are available to write it (if not, make the suggestion via a Github Issue and we can pick up the work as time permits).
5. It's specific to EncoreUI. It matches the EncoreUI style. It doesn't require a large new framework.
6. There isn't already a design pattern for it. The functionality doesn't already exist.

When in doubt about fit, ask in the EncoreUI chat room or open a new GitHub issue.

### Get feedback early and often

It's much better to ask for feedback on an unfinished idea than to recieve feedback on a finished one. If you're developing a new component, or updating an old one, post code as you write it. Don't wait until the Pull Request for a code design review.

## EncoreUI Developer Setup

[EncoreUI Developer Setup](./guides/ui-setup.md) - How to install the EncoreUI codebase

## Coding Standards

[CSS Style Guide](./guides/css-styleguide.md)

[JavaScript Style Guide](./guides/js-styleguide.md)

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

### Update your .gitconfig to only push the current branch

Ensure that you have the following in your `.gitconfig`.
```
[push]
    default = current
```
You can add the above lines to your `.gitconfig` if they aren't there already, or do this via the command line: `git config --global push.default current`

### Diff Before Every Commit

Get into the habit of running git diff or git diff --cached before every commit. This helps ensure no unwanted changes sneak in. Also, check for unnecessary whitespace with `git diff --check`.

### Commits Should Be Granular

You should keep each commit as granular as possible. For instance, do not check in 2 bug fixes in one commit -- separate them out into 2 commits.

### Commits Follow a Common Format

We use [the same commit format that the Angular Team follows](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit-message-format). Any commits that don't follow this format will be rejected.

## Testing

* Run _all_ the tests to assure nothing else was accidentally broken.
* Unit Tested - Minimum coverage requirement - 80% (simple controllers/services may not need to be unit tested, depending on how basic their logic is)
* Midways tests also need to be created for any new components

[More on testing](./guides/testing.md)

## Submitting changes

Before submitting any changes, make sure the master branch is merged locally into your branch (using [Git rebase](http://git-scm.com/book/en/Git-Branching-Rebasing) is preferred). Once done, push your branch up to Github and [submit a Pull Request](https://help.github.com/articles/using-pull-requests).

### Submitting Urgent Changes

Normally, a review of all outstanding PRs is done every morning. This means that a PR submitted in the afternoon may not be reviewed until the next day. For non-urgent changes, this usually isn't an issue (although it isn't fun to wait for feedback).

Sometimes changes are urgent, and in this case, the PR should be reviewed immediately. To mark a PR as urgent, use the 'PR:urgent' label. It's also helpful to note in the Pull Request comments the specifics behind the urgency.

### Pull Request Minimum Requirements

- Complete documentation (a docs subfolder with working examples and [ngdocs](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation)), along with inline code comments as beneficial
- Unit tests with 80% line coverage
- Midways tests for all new UI functionality
- Proper commit logs
- Passes JSHint & CSSLint

Once a pull request has been submitted, you simply need to wait for the EncoreUI team to respond. Every pull request sends an e-mail out to the team, so there is no need to send any further communication to the team. If the pull request is urgent, that needs to be communicated before the pull request is sent.

We like to at least comment on, if not accept, pull requests within three business days (and, typically, one business day). We may suggest some changes or improvements or alternatives, so **make sure there is time for review in your release plan**.

### Finalizing a Pull Request

Occasionally a PR will receive comments and/or requests for changes before we merge it in. These changes should be submitted as new commits on the existing PR.

Once we are happy with the final state of the PR, we will write "LGTM" or "Looks good to me" as a comment, and ask that you squash all of your commits down into one or two. We normally do this as follows:

 1. `git rebase -i HEAD~x` where x = number of commits you've made on the branch/PR (The Conversation/Commits/Files Changed tab on the PR page will show you how many commits you've made)
 2. Not including your original commit, mark `f` or `s` for all commits after it ([see example that follows](#example-of-step-2))
 3. Update the latest master and do `git rebase master` on your branch, now that everything has been summed up into one or two commits
  1. You may run into a merge conflict. In that case, open the conflicting file(s) and modify it so that it reflects the desired final state.
  2. `git add <filename>` will include the corrected file into the rebase
  3. `git rebase --continue` will conclude the rebase now that the conflict has been resolved
 4. `git push -f` to force push your branch up to Github

Once Travis completes the tests on the rebased branch, we'll merge in the PR.

#### Example of Step 2

```
pick 3564c3f feat(rxApp): the first of your PR commits with a good commit message
f 6d1216f fix(rxApp): typo
f 989861d fix(rxApp): another typo

# Rebase 422f14b..f6318bb onto 422f14b
#
# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#  x, exec = run command (the rest of the line) using shell
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

## Right to Revert

Once the contribution has been merged into the repo, if any issues arise in the integration environment or upon subsequent feedback, the contribution may be reverted.
