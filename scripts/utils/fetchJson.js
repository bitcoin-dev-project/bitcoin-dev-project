"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchJsonData = fetchJsonData;
async function fetchJsonData(path) {
    const res = await fetch(path);
    if (!res.ok) {
        throw new Error(`Failed to fetch ${path}: ${res.status}`);
    }
    return res.json();
}
