"use strict";
/*
    This file is used to create an Apollo Client instance that will be used in React Server
    Components and not for Server Side Rendering in Client Components.
    See https://github.com/apollographql/apollo-client-nextjs?tab=readme-ov-file#usage for more details.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = void 0;
const client_1 = require("@apollo/client");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getClient = () => {
    const authToken = dotenv_1.default.config()?.parsed?.SFIGS_TOKEN || process.env.SFIGS_TOKEN;
    if (!authToken) {
        console.error("SFIGS_TOKEN is not set in the environment variables");
        process.exit(1);
    }
    return new client_1.ApolloClient({
        cache: new client_1.InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        repository: {
                            merge(existing = {}, incoming) {
                                return {
                                    ...existing,
                                    ...incoming
                                };
                            }
                        }
                    }
                },
                Repository: {
                    fields: {
                        issues: {
                            merge(existing = { edges: [] }, incoming) {
                                return {
                                    ...existing,
                                    edges: [
                                        ...existing.edges,
                                        ...incoming.edges
                                    ]
                                };
                            }
                        }
                    }
                }
            }
        }),
        link: new client_1.HttpLink({
            uri: "https://api.github.com/graphql",
            fetch: cross_fetch_1.default,
            headers: {
                authorization: `bearer ${authToken}`
            }
        })
    });
};
exports.getClient = getClient;
