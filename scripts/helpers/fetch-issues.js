"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const get_issues_1 = require("../graphql/queries/get-issues");
const apollo_client_1 = require("../lib/apollo-client");
const index_json_1 = __importDefault(require("../public/open-source-projects/index.json"));
const labels = ["good first issue", "bug", "help wanted"];
const states = ["OPEN"];
const projectRepoMetadata = Object.entries(index_json_1.default).map(([_, project]) => ({
    name: project.name,
    owner: project.org,
    languages: project.lang
}));
const repoWithLabelsAndStates = projectRepoMetadata.map((repo) => ({
    ...repo,
    labels,
    states
}));
const fetchAndSaveIssues = async () => {
    try {
        const apolloClient = (0, apollo_client_1.getClient)();
        const query = (0, get_issues_1.constructRepoQueries)(repoWithLabelsAndStates);
        console.log("Fetching issues...");
        const { data } = await apolloClient.query({ query });
        for (const [key, issuesData] of Object.entries(data)) {
            if (!issuesData)
                continue;
            const issues = issuesData?.issues?.edges;
            const projectIssues = issues.map((edge) => ({
                url: edge.node.url,
                publishedAt: edge.node.publishedAt,
                title: edge.node.title,
                labels: edge.node.labels.edges.map((label) => label.node.name)
            }));
            const repoPath = `public/open-source-projects/issues/${key}/index.json`;
            const dir = node_path_1.default.dirname(repoPath);
            if (!node_fs_1.default.existsSync(dir)) {
                await node_fs_1.default.promises.mkdir(dir, {
                    recursive: true
                });
            }
            await node_fs_1.default.promises.writeFile(repoPath, JSON.stringify(projectIssues, null, 2));
            console.log(`Saved issues for ${key} in ${repoPath} successfully!`);
        }
        return data;
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
fetchAndSaveIssues()
    .then(() => console.log("Fetched and saved issues successfully!"))
    .catch((error) => {
    console.error("Error fetching and saving issues", error);
    process.exit(1);
});
