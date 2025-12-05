export const formatCurrency = (value: number) => {
	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value)
}

export function formatWithoutCurrency(value: number) {
	const formattedValue = new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value)

	// Remove the currency symbol
	const integerPart = formattedValue.split(".")[0]
	const numberWithoutSymbol = integerPart.replace(/[^\d.,-]/g, "")
	return numberWithoutSymbol
}

export function formatfordecimal(value: number) {
	const formattedValue = new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value)

	// Remove the currency symbol and characters before the decimal point
	const decimalPart = formattedValue.match(/\.\d{2}/)
	return decimalPart ? decimalPart[0] : ".00" // Fallback to .00 if no match
}
