import { Box, TypographyStylesProvider } from "@mantine/core";
import CvHeading from "./CvHeading";
import HeadingDivider from "./HeadingDivider";

export default function LanguageSection({ languages }) {
	return (
		<Box component="section" pl={10} pr={20}>
			<CvHeading heading="Language" />
			<HeadingDivider w={200} />
			<TypographyStylesProvider>
				<div dangerouslySetInnerHTML={{ __html: languages }} />
			</TypographyStylesProvider>
		</Box>
	);
}
