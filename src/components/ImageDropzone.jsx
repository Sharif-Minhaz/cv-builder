import { useState } from "react";
import { Text, Image, SimpleGrid, Group, rem, Box } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";

export default function ImageDropzone({ form }) {
	const [file, setFile] = useState(null);

	// Generate a preview URL if a file exists
	const previews = file ? (
		<Image
			src={URL.createObjectURL(file)}
			alt="Profile Preview"
			onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))} // Revoke the URL to free memory
		/>
	) : null;

	const handleSetImage = (files) => {
		// Set the file to state and update the form
		setFile(files[0]);
		form.setFieldValue("profileImage", files[0]);
	};

	const eraseImage = () => {
		// Clear the file and reset the form field
		setFile(null);
		form.setFieldValue("profileImage", null);
	};

	return (
		<div>
			<Box mb={2} style={{ fontSize: "15px" }}>
				Upload profile image
			</Box>
			{!file ? (
				<Dropzone
					onDrop={handleSetImage}
					onReject={(files) => console.log("rejected files", files)}
					maxFiles={1}
					maxSize={5 * 1024 ** 2}
					accept={IMAGE_MIME_TYPE}
					style={{ border: "1px solid #e3e3e3" }}
					w={200}
					radius="md"
				>
					<Group
						justify="center"
						align="center"
						gap="xl"
						mih={220}
						style={{ pointerEvents: "none" }}
					>
						<Dropzone.Accept>
							<IconUpload
								style={{
									width: rem(52),
									height: rem(52),
									color: "var(--mantine-color-blue-6)",
								}}
								stroke={1.5}
							/>
						</Dropzone.Accept>
						<Dropzone.Reject>
							<IconX
								style={{
									width: rem(52),
									height: rem(52),
									color: "var(--mantine-color-red-6)",
								}}
								stroke={1.5}
							/>
						</Dropzone.Reject>
						<Dropzone.Idle>
							<IconPhoto
								style={{
									width: rem(52),
									height: rem(52),
									color: "var(--mantine-color-dimmed)",
								}}
								stroke={1.5}
							/>
						</Dropzone.Idle>

						<div>
							<Text size="xl" inline ta="center" px="md" lh={1.2} c="gray">
								Drag image here or click to select file
							</Text>
						</div>
					</Group>
				</Dropzone>
			) : (
				<SimpleGrid cols={{ base: 1, sm: 4 }}>
					<Box
						display="inline-block"
						bd={1}
						style={{ borderStyle: "solid", borderColor: "#e0e0e0" }}
						pos="relative"
					>
						{previews}
						<Box pos="absolute" top={1} right={1}>
							<IconX
								style={{
									width: rem(32),
									height: rem(32),
									color: "var(--mantine-color-red-6)",
								}}
								cursor="pointer"
								stroke={1.5}
								onClick={eraseImage}
							/>
						</Box>
					</Box>
				</SimpleGrid>
			)}
		</div>
	);
}
