import { Outlet, ScrollRestoration } from "react-router-dom";
import { Container } from "@mantine/core";

export default function Root() {
	return (
		<Container size="md" p="md">
			<ScrollRestoration />
			<Outlet />
		</Container>
	);
}
