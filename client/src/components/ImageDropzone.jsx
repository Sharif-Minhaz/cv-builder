import { useState } from "react";
import { Text, Image, SimpleGrid, Group, rem, Box } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import ErrorTooltip from "./ErrorTooltip";
import RequiredStar from "./RequiredStar";
import { notifications } from "@mantine/notifications";

export default function ImageDropzone({ form }) {
	const [file, setFile] = useState(null);
	const [_, setUploading] = useState(false);
	const [uploadedUrl, setUploadedUrl] = useState(form.values?.profileImage);

	const previews = file ? (
		<Image
			draggable={false}
			fit
			w={{ base: rem(220), md: rem(220), sm: rem(180) }}
			src={URL.createObjectURL(file)}
			alt="Profile Preview"
			bd={"1px solid #dfdfdf"}
			onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
		/>
	) : uploadedUrl ? (
		<Image
			fit
			bd={"1px solid #dfdfdf"}
			w={{ base: rem(220), md: rem(220), sm: rem(180) }}
			draggable={false}
			src={uploadedUrl}
			alt="image"
		/>
	) : null;

	// const previews = ;

	const handleSetImage = async (files) => {
		const selectedFile = files[0];
		setFile(selectedFile);
		form.setFieldValue("profileImage", selectedFile); // Keep in form state if needed

		// Immediately upload the file
		try {
			setUploading(true);

			// Prepare the file data for Cloudinary
			const formData = new FormData();
			formData.append("file", selectedFile); // Add the file
			formData.append("upload_preset", "zuapqncl");
			formData.append("folder", "cv_builder");

			// Upload to Cloudinary
			const response = await fetch(
				`https://api.cloudinary.com/v1_1/hostingimagesservice/image/upload`,
				{
					method: "POST",
					body: formData,
				}
			);

			const data = await response.json();

			if (data.secure_url) {
				setUploadedUrl(data.secure_url); // Store the Cloudinary URL
				form.setFieldValue("profileImage", data.secure_url); // Update the form with the Cloudinary URL
				notifications.show({
					title: "Upload Successful",
					message: "Profile image uploaded successfully!",
					color: "green",
				});
			} else {
				console.error("Upload failed:", data);
				notifications.show({
					title: "Upload Failed",
					message: "Failed to upload image. Please try again.",
					color: "red",
				});
			}
		} catch (error) {
			console.error("Error uploading to Cloudinary:", error);
			notifications.show({
				title: "Upload Error",
				message: "An error occurred during upload. Please try again.",
				color: "red",
			});
		} finally {
			setUploading(false);
		}
	};

	const eraseImage = () => {
		setFile(null);
		setUploadedUrl(null);
		form.setFieldValue("profileImage", null);
	};

	return (
		<div>
			<ErrorTooltip offset={-25} message={form.errors?.profileImage}>
				<Box mb={4} style={{ fontSize: "18px" }}>
					{/* <Text> */}
					Upload Image
					<RequiredStar />
					{/* </Text> */}
				</Box>
			</ErrorTooltip>
			{!file && !uploadedUrl ? (
				<Dropzone
					onDrop={handleSetImage}
					onReject={(files) => console.log("rejected files", files)}
					maxFiles={1}
					maxSize={5 * 1024 ** 2}
					accept={IMAGE_MIME_TYPE}
					style={{
						border: form.errors?.profileImage
							? "1px solid #ff4444"
							: "1px solid #e3e3e3",
						borderRadius: "8px",
					}}
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
									marginTop: rem(20),
									width: rem(85),
									height: rem(85),
									color: form.errors?.profileImage
										? "var(--mantine-color-red-5)"
										: "var(--mantine-color-blue-6)",
								}}
								stroke={1.5}
							/>
						</Dropzone.Idle>

						<div>
							<Text
								size="16px"
								inline
								ta="center"
								py={15}
								px="md"
								lh={1.4}
								c={form.errors?.profileImage ? "red" : "gray"}
							>
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
			{/* Submit Button */}

			{/* <Flex justify={{ base: "center", md: "left" }}>
				<Button
					mt={10}
					onClick={handleSubmit}
					loading={uploading}
					disabled={uploading || !file || uploadedUrl}
					color="blue"
				>
					<IconUpload size={rem(15)} stroke={2} />
					<Text ml={5}>
						{uploading ? "Uploading..." : uploadedUrl ? "Uploaded" : "Upload"}
					</Text>
				</Button>
			</Flex> */}
		</div>
	);
}
