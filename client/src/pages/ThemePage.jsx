import { Box, Divider, Grid } from "@mantine/core";
import SingleTheme from "../components/modules/cv-modules/themes/SingleTheme";
import defaultTheme from "../assets/themes/default-theme.png";
import blackWhite from "../assets/themes/black-white.webp";
import modern from "../assets/themes/modern.webp";
import editors from "../assets/themes/editors.webp";
import DefaultCVContent from "../components/modules/cv-modules/cv/DefaultCVContent";
import BlackWhiteContent from "../components/modules/cv-modules/cv/BlackWhiteContent";

const themeData = [
	{
		id: 1,
		name: "default",
		image: defaultTheme,
		Content: DefaultCVContent,
	},
	{
		id: 2,
		name: "Black & White",
		image: blackWhite,
		Content: BlackWhiteContent,
	},
];

const comingSoonTheme = [
	{
		id: 3,
		name: "editors",
		image: editors,
		comingSoon: true,
	},
	{
		id: 4,
		name: "Modern",
		image: modern,
		comingSoon: true,
	},
];

export default function ThemePage() {
	return (
		<Box
			bg="white"
			bd="1px solid #dfdfdf"
			w="100%"
			mih="100vh"
			style={{ borderRadius: "8px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
			p={{ base: 10, sm: 20 }}
		>
			<Box component="h2" c="#3d3d3d" mt={0} fw="bold" mb={15}>
				Choose a Theme
			</Box>
			<Divider />
			<Grid mt={20} gutter={{ base: 10, sm: 20 }}>
				{themeData.map((theme) => (
					<SingleTheme key={theme.id} theme={theme} Content={theme.Content} />
				))}
				{comingSoonTheme.map((theme) => (
					<SingleTheme key={theme.id} theme={theme} comingSoon={theme.comingSoon} />
				))}
			</Grid>
		</Box>
	);
}
