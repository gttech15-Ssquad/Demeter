export const acctoString = (
	value: string | number | null | undefined
): string => {
	if (value === null || value === undefined) {
		return "" // Return an empty string if the value is null or undefined
	}
	return String(value) // Convert the value to a string
}

export const sanitize = (value: string) =>
	value
		.toLowerCase()
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ")

// export const encodeQueryParams = (query: { [key: string]: string }) => {
// 	return Object.keys(query)
// 		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
// 		.join("&")
// }

export const encodeQueryParams = (
	query: Record<string, string | number | undefined>
) => {
	return Object.entries(query)
		.filter(([_, value]) => value !== undefined && value !== null)
		.map(
			([key, value]) =>
				`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
		)
		.join("&")
}

export const indexToString = (index: number) =>
	index < 10 ? `0${index}` : `${index}`

export const normalizePath = (path: string) => {
	let normalPath: string
	if (path.split("/").length > 2) {
		const pathParts = `/${path.split("/")[1]}/${path.split("/")[2]}`
		normalPath = pathParts
	} else {
		normalPath = path
	}
	return normalPath
}
