export function paginate<T>(data: T[], current: number, pageSize: number): T[] {
	const startIndex = (current - 1) * pageSize
	const endIndex = startIndex + pageSize
	return data.slice(startIndex, endIndex)
}
