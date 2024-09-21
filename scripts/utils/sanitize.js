"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitize = sanitize;
function sanitize(name) {
    // Remove all characters that are not alphanumeric or underscore
    return name.replace(/[^a-zA-Z0-9_]/g, "");
}
