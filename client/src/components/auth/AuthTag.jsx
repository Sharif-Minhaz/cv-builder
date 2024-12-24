import { Box, Divider, Flex } from "@mantine/core";
import { IconKey } from "@tabler/icons-react";

export default function AuthTag({ label }) {
	return (
		<Divider
			labelPosition="center"
			label={
				<Flex
					align="center"
					justify="center"
					bg="white"
					style={{ borderRadius: "10px" }}
					bd="1px solid #dfdfdf"
					p="6px 8px"
				>
					<IconKey size={14} />
					<Box ml={5}>{label}</Box>
				</Flex>
			}
		/>
	);
}
