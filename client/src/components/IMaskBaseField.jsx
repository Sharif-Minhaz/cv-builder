import { InputBase } from "@mantine/core";
import { IMaskInput } from "react-imask";
import TooltipInfo from "./TooltipInfo";

export default function IMaskBaseField({
	mt = 0,
	label,
	placeholder,
	value,
	isError,
	handleChange,
	mask,
}) {
	return (
		<InputBase
			label={label}
			component={IMaskInput}
			mask={mask}
			placeholder={placeholder}
			value={value}
			mt={mt}
			rightSection={<TooltipInfo info={label} />}
			withAsterisk
			onChange={handleChange}
			error={isError}
		/>
	);
}
