type DateInput = string | number | Date

export const formatDate = (date: DateInput) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })
}

export const formatDateTime = (date: DateInput) => {
    return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short"
    })
}

export const formatCalendarDate = (date: DateInput) => {
    const d = new Date(date)
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
}
