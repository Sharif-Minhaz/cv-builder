import { rem } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";

export default function DateInputBox({
	error,
	label,
	handleChange,
	placeholder,
	value,
	allowSingleDateInRange = false,
	clearable = true,
}) {
	const icon = <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;
	return (
		<DatePickerInput
			valueFormat="MMM YYYY"
			leftSection={icon}
			leftSectionPointerEvents="none"
			type="range"
			label={label}
			placeholder={placeholder}
			value={value}
			onChange={handleChange}
			allowSingleDateInRange={allowSingleDateInRange} // Prevent single date selection
			error={error}
			clearable={clearable} // Allow clearing the selection
		/>
	);
}
