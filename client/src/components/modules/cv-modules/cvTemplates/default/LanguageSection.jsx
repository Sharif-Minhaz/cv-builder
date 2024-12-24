import { Box, TypographyStylesProvider } from "@mantine/core";
import CvHeading from "./CvHeading";
import HeadingDivider from "./HeadingDivider";
import { decodeHtml } from "../../../../../utils";

export default function LanguageSection({ languages }) {
	const decodedLanguages = decodeHtml(languages);
	return (
		<Box component="section" pl={10} pr={20}>
			<CvHeading heading="Language" />
			<HeadingDivider w={200} />
			<TypographyStylesProvider>
				<div
					style={{
						fontSize: "13px",
						lineHeight: 1.1,
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
					dangerouslySetInnerHTML={{ __html: decodedLanguages }}
				/>
			</TypographyStylesProvider>
		</Box>
	);
}
