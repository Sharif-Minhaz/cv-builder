import { Box, Divider, TypographyStylesProvider } from "@mantine/core";

export default function PortfolioSection({ portfolio }) {
	return (
		<section>
			<Box component="h2">PORTFOLIO</Box>
			<Divider />
			<TypographyStylesProvider>
				<div dangerouslySetInnerHTML={{ __html: portfolio }} />
			</TypographyStylesProvider>
		</section>
	);
}
