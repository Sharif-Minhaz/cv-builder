import { Text, Container, ActionIcon, Group, Box, Flex } from "@mantine/core";
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react";

export default function AppFooter() {
	return (
		<Box component="footer" height={60} p="md" bg="#fcfcfc">
			<Container size="lg">
				<Flex
					justify="space-between"
					direction={{ base: "column", md: "row" }}
					align="center"
					spacing="xl"
					h="100%"
				>
					<Text c="dimmed" size="sm">
						© {new Date().getFullYear()} RightBrain Solution. All rights reserved.
					</Text>
					<Group spacing={0} position="right" noWrap>
						<ActionIcon
							size="lg"
							color="gray"
							variant="subtle"
							component="a"
							href="https://facebook.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<IconBrandFacebook size="1.1rem" stroke={1.5} />
						</ActionIcon>
						<ActionIcon
							size="lg"
							color="gray"
							variant="subtle"
							component="a"
							href="https://instagram.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<IconBrandInstagram size="1.1rem" stroke={1.5} />
						</ActionIcon>
						<ActionIcon
							size="lg"
							color="gray"
							variant="subtle"
							component="a"
							href="https://linkedin.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<IconBrandLinkedin size="1.1rem" stroke={1.5} />
						</ActionIcon>
					</Group>
				</Flex>
			</Container>
		</Box>
	);
}
