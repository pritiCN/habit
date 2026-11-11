export function getTodayMillis(): number {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d.getTime();
}