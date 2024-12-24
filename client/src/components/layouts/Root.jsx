import { Outlet } from "react-router-dom";
import { Box } from "@mantine/core";

export default function Root() {
	return (
		<Box>
			<Outlet />
		</Box>
	);
}
