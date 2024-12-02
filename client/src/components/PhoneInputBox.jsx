import { Box, InputBase } from "@mantine/core";
import { IMaskInput } from "react-imask";
import ErrorTooltip from "./ErrorTooltip";
import TooltipInfo from "./TooltipInfo";

export default function PhoneInputBox({ form, name, label, placeholder, mt = 8 }) {
	return (
		<Box className="phone-input" w="100%" component="section">
			<ErrorTooltip message={form.errors?.[name]}>
				<Box>
					<InputBase
						label={label}
						component={IMaskInput}
						mask={/^[\d\s()+]*$/}
						placeholder={placeholder}
						key={form.key(name)}
						mt={mt}
						rightSection={<TooltipInfo info={label} />}
						{...form.getInputProps(name)}
						error={!!form.errors?.[name]}
					/>
				</Box>
			</ErrorTooltip>
		</Box>
	);
}
