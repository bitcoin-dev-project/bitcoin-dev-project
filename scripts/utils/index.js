"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swapImageUrl = exports.applySearch = exports.applyFilter = exports.applySort = exports.createSortKeys = exports.FILTERTAGS = exports.ISSUEOPTIONS = exports.SORTOPTIONS = void 0;
exports.getValues = getValues;
exports.filterIssues = filterIssues;
exports.shuffle = shuffle;
exports.SORTOPTIONS = ["sort", "random", "newest first", "oldest first"];
exports.ISSUEOPTIONS = ["labels", "good first issue", "bug", "help wanted"];
exports.FILTERTAGS = [
    "search",
    "sort",
    "labels",
    "languages",
    "tags",
    "repo",
    "owner"
];
function getValues({ key, issues }) {
    const properties = issues.reduce((acc, issue) => {
        const project = issue[key];
        if (Array.isArray(project)) {
            return acc.concat(project);
        }
        acc.push(project);
        return acc;
    }, [key]);
    const uniqueProperties = Array.from(new Set(properties).values());
    return { properties: uniqueProperties };
}
const createSortKeys = () => {
    const sortKeys = exports.SORTOPTIONS.slice(1).map((key) => {
        const dashed_key = key.split(" ").join("-");
        return { key: dashed_key, label: key };
    });
    return { sortKeys };
};
exports.createSortKeys = createSortKeys;
function filterIssues(filterArgNkey, dataSet, sortKey, searchQuery) {
    let result = [];
    if (!filterArgNkey.length || filterArgNkey.length === 0) {
        return dataSet;
    }
    if (filterArgNkey.length) {
        (0, exports.applyFilter)(dataSet, filterArgNkey, result);
    }
    if (sortKey) {
        result = result.length === 0 ? dataSet : result;
        (0, exports.applySort)(sortKey, result);
    }
    if (searchQuery) {
        result = result.length === 0 ? dataSet : result;
        return (0, exports.applySearch)(searchQuery, result);
    }
    return result;
}
// applies sort to the dataset or result
// Sorts according to newest-issues, oldest-issues and relevance which is the default state
const applySort = (sortKey, result) => {
    switch (sortKey) {
        case "random":
            return result;
        case "newest-first":
            return result.sort((a, b) => new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime());
        case "oldest-first":
            return result.sort((a, b) => new Date(a.publishedAt).getTime() -
                new Date(b.publishedAt).getTime());
        default:
            break;
    }
};
exports.applySort = applySort;
// applies filter to the dataset or result
// filter searhes each item in the dataset based on filter key selected and returns results as expected
const applyFilter = (dataSet, filterArgNkey, result) => {
    const rename_keys = filterArgNkey.map(({ key, filter }) => {
        switch (key) {
            case "name":
                return { key: "repo", filter };
            case "lang":
                return { key: "languages", filter };
            case "org":
                return { key: "owner", filter };
            default:
                return { key, filter };
        }
    });
    dataSet.filter((resultValue) => {
        rename_keys.map(({ key, filter }) => {
            filter = filter.toLowerCase();
            const isPresent = result.some((val) => val.number === resultValue.number);
            let valueInCheck = resultValue?.[key];
            if (Array.isArray(valueInCheck)) {
                valueInCheck = valueInCheck.map((val) => val.toLowerCase());
                if (valueInCheck.includes(filter)) {
                    if (isPresent)
                        return;
                    return result.push(resultValue);
                }
            }
            else if (typeof valueInCheck === "string" &&
                valueInCheck.toLowerCase() === filter.toLowerCase()) {
                if (isPresent)
                    return;
                return result.push(resultValue);
            }
        });
    });
};
exports.applyFilter = applyFilter;
// applies search to the dataset or result
// Search is based on title, repository and language
const applySearch = (searchQuery, result) => {
    const nullableSearchTerm = searchQuery?.toLocaleLowerCase() ?? "";
    return result.filter((item) => {
        return ((item?.title)
            .toLowerCase()
            .includes(nullableSearchTerm) ||
            (item?.owner)
                .toLowerCase()
                .includes(nullableSearchTerm) ||
            (item?.repo).toLowerCase().includes(nullableSearchTerm) ||
            (item?.languages).some((val) => val.toLowerCase().includes(nullableSearchTerm)));
    });
};
exports.applySearch = applySearch;
function shuffle(data) {
    let currIndex = data.length;
    while (currIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currIndex);
        currIndex--;
        [data[currIndex], data[randomIndex]] = [
            data[randomIndex],
            data[currIndex]
        ];
    }
    return data;
}
const swapImageUrl = (name, imageUrl) => {
    switch (name) {
        case "polar":
            return "/images/projects/polar.jpg";
        case "lnd":
            return "/images/projects/lnd.png";
        case "eclair":
            return "/images/projects/eclair-logo.png";
        case "warnet":
            return "/images/projects/warnet.jpg";
        case "sim-ln":
            return "/images/projects/simln.jpg";
        default:
            return imageUrl;
    }
};
exports.swapImageUrl = swapImageUrl;
