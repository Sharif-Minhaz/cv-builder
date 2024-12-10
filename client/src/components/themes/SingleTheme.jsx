import { Box, Grid, Image } from "@mantine/core";
import PreviewModal from "../PreviewModal";
import { useDisclosure } from "@mantine/hooks";

export default function SingleTheme({ theme, Content, comingSoon = false }) {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<Grid.Col span={{ base: 6, md: 4 }}>
			<PreviewModal
				close={close}
				opened={opened}
				previewButton={
					<Box pos="relative">
						<Image
							style={{ cursor: comingSoon ? "not-allowed" : "pointer" }}
							bd={"1px solid #dfdfdf"}
							src={theme.image}
							width="100%"
							height="100%"
							onClick={comingSoon ? () => {} : open}
						/>
						{comingSoon && (
							<Box
								pos="absolute"
								top={22}
								left={-14}
								bg="#f44336"
								c="#fff"
								p="5px 10px"
								fw="bold"
								ta="center"
								lts={1}
								style={{
									fontSize: "10px",
									transform: "rotate(-45deg)",
									boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
								}}
							>
								Coming Soon
							</Box>
						)}
					</Box>
				}
			>
				{/* ------- cv content (theme) ------- */}
				{!comingSoon && <Content closeModal={close} />}
			</PreviewModal>
		</Grid.Col>
	);
}
