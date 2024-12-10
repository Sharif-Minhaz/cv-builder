import { Flex, Text } from "@mantine/core";
import { IconBrush } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function ThemeButton() {
	return (
		<Link to="/themes" style={{ textDecoration: "none" }}>
			<Flex
				align="center"
				gap={5}
				bd={"1px solid #dfdfdf"}
				p="5px 10px"
				style={{
					borderRadius: "6px",
					boxShadow: "rgba(0, 0, 0, 0.24) 0px 1px 2px",
				}}
			>
				<IconBrush size={17} stroke={1.5} style={{ marginRight: 0 }} /> <Text>Themes</Text>
			</Flex>
		</Link>
	);
}
