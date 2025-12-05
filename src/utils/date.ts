export const formatDate = (date: Date) => {
	return new Intl.DateTimeFormat("en-NG", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(new Date(date))
}

export const formatunknownDate = (date: Date | string | undefined): string => {
	if (!date) return "" // Handle null or undefined dates gracefully
	return new Intl.DateTimeFormat("en-NG", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(new Date(date))
}

export function timeStringToDate(time: string): Date {
	const [hours, minutes, seconds = "0"] = time.split(":")
	const d = new Date()
	d.setHours(Number(hours), Number(minutes), Number(seconds), 0)
	return d
}

export function dateToTimeString(d: Date): string {
	return d.toTimeString().split(" ")[0] // "14:05:33"
}
