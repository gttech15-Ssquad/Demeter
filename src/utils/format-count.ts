export const formatCount = (count: number): string => {
	const format = (num: number, suffix: string): string => {
		const rounded = num.toFixed(1)
		return `${rounded.endsWith(".0") ? parseInt(rounded) : rounded}${suffix}+`
	}

	if (count >= 1_000_000_000) {
		return format(count / 1_000_000_000, "B")
	} else if (count >= 1_000_000) {
		return format(count / 1_000_000, "M")
	} else if (count >= 1_000) {
		return format(count / 1_000, "k")
	}

	return count.toString()
}

export function countFormat(num: number) {
	if (num < 1000) return num.toString()

	const units = [
		{ value: 1e3, symbol: "K" },
		{ value: 1e6, symbol: "M" },
		{ value: 1e9, symbol: "Bn" },
		{ value: 1e12, symbol: "T" },
		{ value: 1e15, symbol: "Qa" }, // Quadrillion
		{ value: 1e18, symbol: "Qi" }, // Quintillion
		{ value: 1e21, symbol: "Sx" }, // Sextillion
		{ value: 1e24, symbol: "Sp" }, // Septillion
		{ value: 1e27, symbol: "Oc" }, // Octillion
		{ value: 1e30, symbol: "No" }, // Nonillion
		{ value: 1e33, symbol: "Dc" }, // Decillion
	]

	for (let i = units.length - 1; i >= 0; i--) {
		if (num >= units[i].value) {
			return (
				(num / units[i].value).toFixed(1).replace(/\.0$/, "") + units[i].symbol
			)
		}
	}

	return num.toString()
}

export function normalizeToNigeriaNumber(phone: string): string {
	if (!phone) return ""

	// Trim spaces
	let normalized = phone.trim()

	// If it already starts with +234, do nothing
	if (normalized.startsWith("+234")) {
		return normalized
	}

	// If it starts with 0, replace the leading 0 with +234
	if (normalized.startsWith("0")) {
		return "+234" + normalized.slice(1)
	}

	// If it starts with 234 (without +), add +
	if (normalized.startsWith("234")) {
		return "+" + normalized
	}

	// Otherwise, just prepend +234
	return "+234" + normalized
}
