import { NumberInput } from "@mantine/core";
import ErrorTooltip from "./ErrorTooltip";
import TooltipInfo from "./TooltipInfo";

export default function NumberInputBox({
	form,
	name,
	label,
	placeholder,
	mt = 8,
	withAsterisk = true,
}) {
	return (
		<ErrorTooltip message={form.errors?.[name]}>
			<NumberInput
				type="number"
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
