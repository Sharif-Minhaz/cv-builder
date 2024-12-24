import { TextInput } from "@mantine/core";
import TooltipInfo from "../../../common/TooltipInfo";

export default function BaseTextInputBox({
	withAsterisk = true,
	label,
	placeholder,
	value,
	isError,
	handleChange,
	onKeyDown = () => {},
}) {
	return (
		<TextInput
			withAsterisk={withAsterisk}
			label={label}
			placeholder={placeholder}
			value={value}
			rightSection={<TooltipInfo info={label} />}
			onChange={handleChange}
			error={isError}
			onKeyDown={onKeyDown}
		/>
	);
}
