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
		<Flex justify="space-between">
			<Flex>
				<Flex pos="relative" align="center" px={20} py={8} gap={30} bg="#3d3d3d">
					<Box
						h="100%"
						w="100px"
						bg="#3d3d3d"
						pos="absolute"
						right={-54}
						top={0}
						style={{ clipPath: "polygon(100% 0, 46% 0, 46% 100%)" }}
					></Box>
					<Image
						w={130}
						h={130}
						radius="50%"
						style={{ border: "1px solid grey" }}
						src={cv.profileImage}
						alt="CV profile"
					/>
					<div>
						<Text c="white" size="28px">
							{cv.fname}
						</Text>
						<Divider my={8} />
						<Text c="white" size="18px">
							{cv.designation}
						</Text>
					</div>
				</Flex>
			</Flex>
			<Stack gap={5} justify="flex-end" align="flex-end">
				{socialData.map((data) => (
					<Flex gap={10} key={data.title}>
						<a href={data.link} style={{ textDecorationColor: "#5ba2ff" }}>
							<Text size="15px" c="#5ba2ff">
								{cv[data.title]}
							</Text>
						</a>
						<Flex
							style={{ borderRadius: "50%" }}
							align="center"
							justify="center"
							bg="#3d3d3d"
							w={23}
							h={23}
						>
							<data.icon color="white" size={15} />
						</Flex>
					</Flex>
				))}
			</Stack>
		</Flex>
	);
}
