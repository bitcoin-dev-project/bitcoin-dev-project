/**
 * @jest-environment node
 */
import { isAvailableIssue } from "../helpers/available-issues"

type PrState = "OPEN" | "CLOSED" | "MERGED"

const issue = (assignees: number, prStates: PrState[]) => ({
    assignees: { totalCount: assignees },
    closedByPullRequestsReferences: {
        nodes: prStates.map((state) => ({ state }))
    }
})

describe("isAvailableIssue", () => {
    it("keeps an issue with no assignee and no linked PR", () => {
        expect(isAvailableIssue(issue(0, []))).toBe(true)
    })

    it("excludes an assigned issue", () => {
        expect(isAvailableIssue(issue(1, []))).toBe(false)
    })

    it("excludes an issue with an open linked PR", () => {
        expect(isAvailableIssue(issue(0, ["OPEN"]))).toBe(false)
    })

    it("keeps an issue whose only linked PR is closed", () => {
        expect(isAvailableIssue(issue(0, ["CLOSED"]))).toBe(true)
    })

    it("keeps an issue whose only linked PR is merged", () => {
        expect(isAvailableIssue(issue(0, ["MERGED"]))).toBe(true)
    })

    it("excludes an issue with an open PR among closed and merged ones", () => {
        expect(isAvailableIssue(issue(0, ["CLOSED", "MERGED", "OPEN"]))).toBe(
            false
        )
    })
})
