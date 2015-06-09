# EncoreUI Roadmap and Prioritization

The Encore Framework now supports many development teams. The project is currently being run in [a "Kanban" style](http://en.wikipedia.org/wiki/Kanban_(development)). The project is focused on 'just-in-time delivery' and is built around being able to quickly iterate on features based on developer feedback.

Because we want to be quick to respond to the needs of the developers, no long-term roadmap is defined for the project. This provides the project with the ability to quickly adjust priorities depending on feedback. If something urgent pops up (and it usually does), adjusting the workload won't mess up a long-term roadmap.

While we limit the amount of process involved in planning, the following practices are used to make sure we're effectively managing our backlog.

## Backlog Management

All work related to EncoreUI is tracked inside of the GitHub Issues interface. This ensures an open and easy-to-access backlog for the project. We also use [Waffle.io](https://waffle.io/rackerlabs/encore-ui) for our Kanban taskboard.

## Issue Prioritization

Rather than use a somewhat vaugue prioritization of "high", "medium" and "low", issues are prioritized by when they'll be worked. Three labels help with this:

- `priority:later`
- `priority:soon`
- `priority:now`

Items marked either `now` or `soon` are naturally higher priorities than items marked `later`.

This labelling also provides a bit of a road map for upcoming EncoreUI features/work. Ideally, issues marked as `soon` get moved over to `now` within a week. If not, they issue's priority should be re-evaluated.

There should be no more than five issues labelled as `soon`, as it's unrealistic to work more than that over a short period of time (same goes for `now`).

### Levels of Effort

All issues have a "Level of Effort" metric assigned to them via labels. By design it's very general, but should give a better sense of what each issue will take to resolve.

The levels are:
- Low (<1 day to resolve) (GitHub Label: `effort:low`)
 - Used for minor bug fixes, small changes/enhancements
- Medium (>1 day, <1 week) (GitHub Label: `effort:medium`)
 - All new components should be at least a level medium
- High (>1 week) (GitHub Label: `effort:high`)
 - for changes that require discussion with other people or some outside change that needs to happen

The main purpose of these levels are to provide contributors with a quick way of knowing how much work something is expected to take. If their time is limited, they can filter issues so that only 'low' effort items are shown.

Specific time estimates are not defined, as create somewhat accurate estimates is very time consuming and provides little benefit in a Kanban style system.

Velocity is tracked via [the GitHub commit activity view](https://github.com/rackerlabs/encore-ui/graphs/commit-activity). While the number of commits depends on the size of the issue being worked (smaller issues = more commits), the goal is to reach at least 20 commits per week. The more contributors, the higher the commit count per week should be.

## Providing Feeback

EncoreUI is built for the folks implementing the framework, so it's crucial to recieve feedback on its implementation.

### Creating new issues

Anyone, at any point in time, may open an issue. It can be a bug report, a feature suggestion, or just a simple question. While [the EncoreUI Slack channel](https://rx-encore.slack.com/messages/framework/) is always open for discussion, if it's easier to create an issue, go for it!

### Voting for existing issues

To vote, simply comment on an issue with :+1: or :-1:. As issues garner more votes, it's easier to prioritize them above/below other issues.
