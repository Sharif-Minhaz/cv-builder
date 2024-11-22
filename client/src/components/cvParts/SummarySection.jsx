import { Box, Divider, TypographyStylesProvider } from "@mantine/core";

export default function SummarySection({ details }) {
	return (
		<section>
			<Box component="h2" ta="center">
				SUMMARY
			</Box>
			<Divider />
			<TypographyStylesProvider>
				<div dangerouslySetInnerHTML={{ __html: details }} />
			</TypographyStylesProvider>
		</section>
	);
}
