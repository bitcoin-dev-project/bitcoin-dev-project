export function sanitize(name: string) {
    // Remove all characters that are not alphanumeric or underscore
    return name.replace(/[^a-zA-Z0-9_]/g, "")
}
