import { Box, TypographyStylesProvider } from "@mantine/core";
import CvHeading from "./CvHeading";
import HeadingDivider from "./HeadingDivider";
import { decodeHtml } from "../../../utils";

export default function PortfolioSection({ portfolio }) {
	const decodedPortfolio = decodeHtml(portfolio);
	return (
		<Box component="section" pl={10} pr={20} mt={-15}>
			<CvHeading heading="Portfolio" />
			<HeadingDivider w={200} />
			<TypographyStylesProvider>
				<div
					className="portfolio-section"
					style={{ fontSize: "13px", overflow: "hidden", textOverflow: "ellipsis" }}
					dangerouslySetInnerHTML={{ __html: decodedPortfolio }}
				/>
			</TypographyStylesProvider>
		</Box>
	);
}
