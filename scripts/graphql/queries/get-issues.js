"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructRepoQueries = void 0;
const client_1 = require("@apollo/client");
function sanitize(name) {
    return name.replace(/[^a-zA-Z0-9_]/g, "");
}
function constructRepoQueries(inputs) {
    const queryParts = inputs.map((input, index) => {
        const labelsFormatted = JSON.stringify(input.labels);
        const statesFormatted = input.states
            .map((state) => state.toUpperCase())
            .join(", ");
        const alias = `${sanitize(input.name)}`;
        return `
            ${alias}: repository(owner: "${input.owner}", name: "${input.name}") {
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
exports.constructRepoQueries = constructRepoQueries;
