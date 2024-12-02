import { Text, Group, Box, Button } from "@mantine/core";
import { IconFileCv, IconZoom } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export function Navbar() {
	return (
		<Box
			component="header"
			bg="white"
			height={70}
			p="md"
			pos="fixed"
			display="flex"
			w="100%"
			top={0}
			left={0}
			style={{ zIndex: 1000, boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px" }}
		>
			<Link to="/" style={{ textDecoration: "none" }}>
				<Group spacing="xl" style={{ height: "100%" }}>
					<IconFileCv size="1.5rem" stroke={1.5} color="#228be6" />
					<Text
						component="span"
						variant="gradient"
						gradient={{ from: "indigo", to: "cyan", deg: 45 }}
						size="xl"
						fw="bold"
						ml={-10}
					>
						CV Builder
					</Text>
				</Group>
			</Link>
			<a
				href="https://drive.google.com/file/d/100mML6ULl19DKwrNqmebDm8hPlANxYv9/view"
				target="_blank"
				rel="noreferrer"
				style={{
					textDecoration: "none",
					display: "flex",
					alignItems: "center",
					marginLeft: "auto",
				}}
			>
				<Button size="sm" c="white" bg="#228be6" ml={20} fw={500}>
					<IconZoom size={18} stroke={1.5} style={{ marginRight: 5 }} /> Example
				</Button>
			</a>
		</Box>
	);
}
