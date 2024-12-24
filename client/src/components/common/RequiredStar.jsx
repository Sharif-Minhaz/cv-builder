import { Text } from "@mantine/core";

export default function RequiredStar({ size }) {
	return (
		<Text size={size} component="span" c="red">
			*
		</Text>
	);
}
