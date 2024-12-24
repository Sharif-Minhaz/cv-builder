import { Box, Divider, em, Flex, Image, Text, TypographyStylesProvider } from "@mantine/core";
import { IconMailFilled, IconPhoneFilled, IconWorld } from "@tabler/icons-react";
import CvHeading from "./CvHeading";
import { decodeHtml } from "../../../../../utils";
import { useMediaQuery } from "@mantine/hooks";

const server_url = import.meta.env.VITE_BASE_URL;

export default function TopSection({ cv, pdf = false }) {
	const decodedSummary = decodeHtml(cv?.summary);
	const isTablet = useMediaQuery(`(max-width: ${em(768)})`);

	return (
		<Box component="section">
			<Flex pos="relative" align="center" pl={20} pr={40} py={8} gap={25}>
				<Image
					draggable={false}
					w={{ base: pdf ? 120 : 60, md: 130 }}
					h={{ base: pdf ? 120 : 60, md: 130 }}
					radius="50%"
					bd="1px solid #dfdfdf"
					src={`${server_url}/uploads/${cv?.profileImage}`}
					alt=""
				/>
				<div>
					<Text
						c="#323232"
						fw="bold"
						style={
							pdf ? { fontSize: "35px" } : { fontSize: isTablet ? "25px" : "40px" }
						}
					>
						{cv?.fname}
					</Text>
					<Text mt={6} size="16px">
						{cv?.designation}
					</Text>
					<Divider className="top-header" my={12} w={80} />
					<Flex gap={10} direction={isTablet ? "column" : "row"}>
						<Flex align="center" gap={5}>
							<IconPhoneFilled size={18} />
							<Text size="14px">{cv?.mobile}</Text>
						</Flex>
						<Flex align="center" gap={5}>
							<IconMailFilled size={18} />
							<Text size="14px">{cv?.email}</Text>
						</Flex>
						<Flex align="center" gap={5}>
							<IconWorld size={18} />
							<Text size="14px">{cv?.website}</Text>
						</Flex>
					</Flex>
				</div>
			</Flex>
			{/* -------- summary section ---------- */}
			<CvHeading heading="about me" mt={pdf ? 20 : 30} />
			<TypographyStylesProvider>
				<Box
					style={{ fontSize: "16px" }}
					px={20}
					dangerouslySetInnerHTML={{ __html: decodedSummary }}
				/>
			</TypographyStylesProvider>
		</Box>
	);
}
