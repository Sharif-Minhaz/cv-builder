import { Tooltip } from "@mantine/core";

export default function ErrorTooltip({
	message,
	position = "top-end",
	offset = 5,
	disableErrorTooltip,
	children,
}) {
	return disableErrorTooltip ? (
		<>{children}</>
	) : (
		<Tooltip
			fz={12}
			opened={!!message}
			color="red"
			position={position}
			label={message}
			offset={offset}
			withArrow
			withinPortal={false}
		>
			{children}
		</Tooltip>
	);
}
