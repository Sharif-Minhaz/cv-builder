import { IconInfoCircle } from "@tabler/icons-react";
import { Tooltip } from "@mantine/core";

export default function TooltipInfo({ info }) {
	return (
		<Tooltip position="left" label={info} color="rgba(84, 84, 84, 1)">
			<IconInfoCircle size={16} />
		</Tooltip>
	);
}
