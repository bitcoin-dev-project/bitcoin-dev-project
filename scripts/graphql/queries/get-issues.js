"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructRepoQueries = constructRepoQueries;
const sanitize_1 = require("../../utils/sanitize");
const client_1 = require("@apollo/client");
function constructRepoQueries(inputs) {
    const queryParts = inputs.map((input) => {
        const labelsFormatted = JSON.stringify(input.labels);
        const statesFormatted = input.states
            .map((state) => state.toUpperCase())
            .join(", ");
        const alias = `${(0, sanitize_1.sanitize)(input.name)}`;
        return `
            ${alias}: repository(owner: "${input.owner}", name: "${input.name}") {
                owner {
                    avatarUrl
                }
                issues(first: 99, labels: ${labelsFormatted}, states: ${statesFormatted}) {
                    edges {
                        node {
                            title
                            url
                            number
                            publishedAt
                            labels (first: 5) {
                                edges {
                                    node {
                                        name
                                    }
                                }
                            }
                        }
                    }
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                }
            }
        `;
    });
    return (0, client_1.gql) `
        query GetIssues {
            ${queryParts.join("\n")}
        }
    `;
}
