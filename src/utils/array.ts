type ItemType = string | object // Assuming objects have a `name` property.

export const isArrayOfString = (arr: ItemType[]): arr is string[] => {
	return typeof arr[0] === "string"
}
