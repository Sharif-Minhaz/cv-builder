import { Box, TypographyStylesProvider } from "@mantine/core";
import CvHeading from "./CvHeading";
import HeadingDivider from "./HeadingDivider";

export default function PortfolioSection({ portfolio }) {
	return (
		<Box component="section" pl={10} pr={20} mt={-15}>
			<CvHeading heading="Portfolio" />
			<HeadingDivider w={200} />
			<TypographyStylesProvider>
				<div
					className="portfolio-section"
					style={{ fontSize: "13px" }}
					dangerouslySetInnerHTML={{ __html: portfolio }}
				/>
			</TypographyStylesProvider>
		</Box>
	);
}
