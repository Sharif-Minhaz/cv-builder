import { Box, Divider, TypographyStylesProvider } from "@mantine/core";

export default function LanguageSection({ languages }) {
	return (
		<section>
			<Box component="h2">LANGUAGES</Box>
			<Divider />
			<TypographyStylesProvider>
				<div dangerouslySetInnerHTML={{ __html: languages }} />
			</TypographyStylesProvider>
		</section>
	);
}
