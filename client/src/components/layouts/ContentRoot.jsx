import { Outlet } from "react-router-dom";
import { Box, Container } from "@mantine/core";
import Navbar from "../templates/Navbar";
import AppFooter from "../templates/Footer";

export default function ContentRoot() {
	return (
		<Box>
			<Navbar />
			<Container size="md" p={{ base: "10px", md: "md" }} mt={65}>
				<Outlet />
			</Container>
			<AppFooter />
		</Box>
	);
}
