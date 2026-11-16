"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAvailableIssue = isAvailableIssue;
// An issue is available for a new contributor when nobody is assigned to it
// and no linked pull request is still open (closed or merged PRs do not count).
function isAvailableIssue(issue) {
    if (issue.assignees.totalCount > 0)
        return false;
    return !issue.closedByPullRequestsReferences.nodes.some((pr) => pr.state === "OPEN");
}
