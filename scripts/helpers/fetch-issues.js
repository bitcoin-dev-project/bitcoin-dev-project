"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const dotenv_1 = __importDefault(require("dotenv"));
const get_issues_1 = require("../graphql/queries/get-issues");
const apollo_client_1 = require("../lib/apollo-client");
const index_json_1 = __importDefault(require("../public/open-source-projects/index.json"));
const sanitize_1 = require("../utils/sanitize");
dotenv_1.default.config();
const labels = ["good first issue", "bug", "help wanted"];
const states = ["OPEN"];
const allProjects = Object.entries(index_json_1.default);
const githubProjects = allProjects.filter(([_, p]) => !p.platform || p.platform === "github");
const gitlabProjects = allProjects.filter(([_, p]) => p.platform === "gitlab");
const githubRepoMetadata = githubProjects.map(([_, project]) => ({
    name: project.name,
    owner: project.org,
    languages: project.lang
}));
const repoWithLabelsAndStates = githubRepoMetadata.map((repo) => ({
    ...repo,
    labels,
    states
}));
const saveIssuesToFile = async (repoName, projectIssues) => {
    const repoPath = `public/open-source-projects/issues/${repoName}/index.json`;
    const dir = node_path_1.default.dirname(repoPath);
    if (!node_fs_1.default.existsSync(dir)) {
        await node_fs_1.default.promises.mkdir(dir, { recursive: true });
    }
    await node_fs_1.default.promises.writeFile(repoPath, JSON.stringify(projectIssues, null, 2));
    console.log(`Saved issues for ${repoName} in ${repoPath} successfully!`);
};
const fetchGithubIssues = async () => {
    const apolloClient = (0, apollo_client_1.getClient)();
    const query = (0, get_issues_1.constructRepoQueries)(repoWithLabelsAndStates);
    console.log("Fetching GitHub issues...");
    const { data } = await apolloClient.query({ query });
    for (const [key, issuesData] of Object.entries(data)) {
        if (!issuesData)
            continue;
        const issues = issuesData?.issues?.edges;
        const repositoryImage = issuesData?.owner?.avatarUrl;
        const projectIssues = issues.map((edge) => ({
            url: edge.node.url,
            publishedAt: edge.node.publishedAt,
            title: edge.node.title,
            labels: edge.node.labels.edges.map((label) => label.node.name),
            imageUrl: repositoryImage
        }));
        await saveIssuesToFile(key, projectIssues);
    }
};
const fetchGitlabIssues = async () => {
    const gitlabToken = process.env.GITLAB_TOKEN;
    const authHeaders = gitlabToken
        ? { Authorization: `Bearer ${gitlabToken}` }
        : {};
    for (const [_, project] of gitlabProjects) {
        const encodedPath = encodeURIComponent(`${project.org}/${project.name}`);
        const issuesMap = new Map();
        let imageUrl = "";
        try {
            const groupRes = await (0, cross_fetch_1.default)(`https://gitlab.com/api/v4/groups/${project.org}`, { headers: authHeaders });
            const group = await groupRes.json();
            imageUrl = group.avatar_url || "";
        }
        catch {
            // non-fatal: imageUrl stays empty
        }
        for (const label of labels) {
            const url = `https://gitlab.com/api/v4/projects/${encodedPath}/issues` +
                `?state=opened&labels=${encodeURIComponent(label)}&per_page=99`;
            const res = await (0, cross_fetch_1.default)(url, { headers: authHeaders });
            const issues = await res.json();
            for (const issue of issues) {
                if (!issuesMap.has(issue.iid)) {
                    issuesMap.set(issue.iid, {
                        url: issue.web_url,
                        publishedAt: issue.created_at,
                        title: issue.title,
                        labels: issue.labels,
                        imageUrl
                    });
                }
            }
        }
        const repoName = (0, sanitize_1.sanitize)(project.name);
        await saveIssuesToFile(repoName, Array.from(issuesMap.values()));
    }
};
const fetchAndSaveIssues = async () => {
    try {
        await fetchGithubIssues();
        if (gitlabProjects.length > 0) {
            console.log("Fetching GitLab issues...");
            await fetchGitlabIssues();
        }
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
