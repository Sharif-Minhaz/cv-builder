import { PasswordInput } from "@mantine/core";
import TooltipInfo from "../../../common/TooltipInfo";
import ErrorTooltip from "../../../common/ErrorTooltip";

export default function PasswordInputBox({
	name,
	form,
	withAsterisk = true,
	label,
	placeholder,
	mt = 8,
}) {
	return (
		<ErrorTooltip message={form.errors?.[name]}>
			<PasswordInput
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
