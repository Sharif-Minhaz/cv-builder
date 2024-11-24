import { useState } from "react";
import { Text, Image, SimpleGrid, Group, rem, Box, Button } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";

export default function ImageDropzone({ form }) {
	const [file, setFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [uploadedUrl, setUploadedUrl] = useState(form.values?.profileImage);

	const previews = file ? (
		<Image
			src={URL.createObjectURL(file)}
			alt="Profile Preview"
			onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
		/>
	) : uploadedUrl ? (
		<Image src={uploadedUrl} alt="image" />
	) : null;

	// const previews = ;

	const handleSetImage = (files) => {
		setFile(files[0]);
		form.setFieldValue("profileImage", files[0]); // Keep in form state if needed
	};

	const eraseImage = () => {
		setFile(null);
		setUploadedUrl(null);
		form.setFieldValue("profileImage", null);
	};

	const handleSubmit = async () => {
		if (!file) {
			alert("Please upload an image before submitting.");
			return;
		}

		try {
			setUploading(true);

			// Prepare the file data for Cloudinary
			const formData = new FormData();
			formData.append("file", file); // Add the file
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
				alert("Image uploaded successfully!");
			} else {
				console.log("Something not right", data);
			}
		} catch (error) {
			console.error("Error uploading to Cloudinary:", error);
			alert("Failed to upload image. Please try again.");
		} finally {
			setUploading(false);
		}
	};

	return (
		<div>
			<Box mb={4} style={{ fontSize: "18px" }}>
				Upload profile image
			</Box>
			{!file && !uploadedUrl ? (
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
									marginTop: rem(20),
									width: rem(85),
									height: rem(85),
									color: "var(--mantine-color-dimmed)",
								}}
								stroke={1.5}
							/>
						</Dropzone.Idle>

						<div>
							<Text size="lg" inline ta="center" pb={15} px="md" lh={1.4} c="gray">
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
			{!uploadedUrl && (
				<Button
					mt={10}
					onClick={handleSubmit}
					loading={uploading}
					disabled={uploading}
					color="blue"
				>
					<IconUpload size={rem(15)} stroke={2} />
					<Text ml={5}>{uploading ? "Uploading..." : "Upload"}</Text>
				</Button>
			)}
		</div>
	);
}
