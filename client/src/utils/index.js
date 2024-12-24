import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export function strippedText(text) {
	return text.replace(/<[^>]*>/g, "").trim();
}

export function convertDateToString(range) {
	const start = dayjs(range[0]).format("MMM YYYY"); // e.g., Dec 2024
	const end = dayjs(range[1]).format("MMM YYYY"); // e.g., Oct 2029

	return `${start} - ${end}`;
}

export function convertStringToDate(string) {
	if (!string) return [null, null];

	const [start, end] = string.split(" - ").map((str) => str.trim()); // Trim whitespace

	// Parse dates
	const startDate = dayjs(start, "MMM YYYY", true); // Strict mode parsing
	const endDate = dayjs(end, "MMM YYYY", true);

	if (!startDate.isValid() || !endDate.isValid()) {
		console.error("Invalid date detected:", start, end);
	}

	return [
		startDate.isValid() ? startDate.toDate() : null,
		endDate.isValid() ? endDate.toDate() : null,
	];
}

export function decodeHtml(html) {
	const textArea = document.createElement("textarea");
	textArea.innerHTML = html;
	return textArea.value === "undefined" ? "" : textArea.value;
}
