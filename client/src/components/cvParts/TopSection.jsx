import { Box, Divider, Flex, Image, Stack, Text } from "@mantine/core";
import {
	IconBrandGithubFilled,
	IconBrandLinkedin,
	IconMailFilled,
	IconPhoneFilled,
	IconWorld,
} from "@tabler/icons-react";
import { useMemo } from "react";

export default function TopSection({ cv }) {
	const socialData = useMemo(
		() => [
			{ title: "mobile", icon: IconPhoneFilled, link: `https://wa.me/${cv.mobile}` },
			{ title: "email", icon: IconMailFilled, link: `mailto:${cv.email}` },
			{ title: "github", icon: IconBrandGithubFilled, link: cv.github },
			{ title: "linkedIn", icon: IconBrandLinkedin, link: cv.linkedIn },
			{ title: "website", icon: IconWorld, link: cv.website },
		],
		[cv]
	);

	return (
		<Flex justify="space-between" bg="#f4f4f4" py={12} pr={12}>
			<Flex>
				<Flex pos="relative" align="center" pl={20} pr={40} py={8} gap={25} bg="#3d3d3d">
					<Box
						h="100%"
						w="100px"
						bg="#3d3d3d"
						pos="absolute"
						right={-53}
						top={0}
						style={{ clipPath: "polygon(100% 0, 46% 0, 46% 100%)" }}
					/>
					<Image
						w={100}
						h={100}
						radius="50%"
						bd="1px solid grey"
						src={cv.profileImage}
						alt="CV profile"
					/>
					<div>
						<Text c="white" size="22.4px">
							{cv.fname}
						</Text>
						<Divider className="top-header" my={8} />
						<Text c="white" size="13.8px">
							{cv.designation}
						</Text>
					</div>
				</Flex>
			</Flex>
			<Stack gap={5} justify="flex-end" align="flex-end">
				{socialData.map((data) => (
					<Flex gap={8} key={data.title} wrap="nowrap">
						<a href={data.link} style={{ textDecorationColor: "#5ba2ff" }}>
							<Text size="11px" c="#5ba2ff">
								{cv[data.title]}
							</Text>
						</a>
						<Flex
							style={{ borderRadius: "50%" }}
							align="center"
							justify="center"
							bg="#3d3d3d"
							w={18}
							h={18}
						>
							<data.icon color="white" size={11} />
						</Flex>
					</Flex>
				))}
			</Stack>
		</Flex>
	);
}
