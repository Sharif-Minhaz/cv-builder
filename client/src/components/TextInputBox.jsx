import { TextInput } from "@mantine/core";
import ErrorTooltip from "./ErrorTooltip";
import TooltipInfo from "./TooltipInfo";

export default function TextInputBox({
	form,
	name,
	label,
	placeholder,
	mt = 8,
	withAsterisk = true,
}) {
	return (
		<ErrorTooltip message={form.errors?.[name]}>
			<TextInput
				withAsterisk={withAsterisk}
				label={label}
				placeholder={placeholder}
				key={form.key(name)}
				mt={mt}
				rightSection={<TooltipInfo info={label} />}
				{...form.getInputProps(name)}
				error={!!form.errors?.[name]}
			/>
		</ErrorTooltip>
	);
}
