import { Outlet } from "react-router-dom";
import { Flex } from "@mantine/core";

export default function AuthRoot() {
	return (
		<Flex justify="center" align="center" h="100vh" w="100%" p={{ base: "10px", md: "md" }}>
			<Outlet />
		</Flex>
	);
}
