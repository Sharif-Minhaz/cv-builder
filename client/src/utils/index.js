export function strippedText(text) {
	return text.replace(/<[^>]*>/g, "").trim();
}
