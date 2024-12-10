import { Box, Group, Text, Image } from "@mantine/core";
import AuthTag from "./AuthTag";

export default function AuthWrapper({ label, children }) {
	return (
		<Box
			bg="white"
			w={{ base: "100%", md: 400 }}
			miw={320}
			p={15}
			style={{ borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
		>
			<Group spacing="xl" h="100%" mt={15} mb={25}>
				<Box>
					<Image src="/brand.png" width={45} height={45} />
				</Box>
				<Text
					component="span"
					variant="gradient"
					gradient={{ from: "indigo", to: "cyan", deg: 45 }}
					size="30px"
					fw="bold"
					ml={-10}
				>
					CV Builder
				</Text>
			</Group>
			<AuthTag label={label} />
			{children}
		</Box>
	);
}
