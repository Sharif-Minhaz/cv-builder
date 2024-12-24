import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";
import ErrorTooltip from "../../../common/ErrorTooltip";
import { useEffect } from "react";

const RichTextEditorComponent = ({
	value,
	onChange,
	placeholder,
	error,
	disableErrorTooltip = false,
	h = "auto",
	mt = -10,
}) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			Superscript,
			SubScript,
			Highlight,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
			Placeholder.configure({ placeholder }),
		],
		content: value,
		onUpdate: ({ editor }) => {
			const htmlContent = editor.getHTML();
			onChange(htmlContent);
		},
	});

	useEffect(() => {
		if (editor && editor.getHTML() !== value) {
			editor.commands.setContent(value || ""); // Default to an empty paragraph
		}
	}, [value, editor]);

	return (
		<ErrorTooltip message={error} disableErrorTooltip={disableErrorTooltip}>
			<RichTextEditor
				bd={error && "1px solid #ff5b5b"}
				editor={editor}
				mt={mt}
				mih={{ base: 270, md: 170 }}
				h={h}
				style={{ overflow: "scroll" }}
			>
				<RichTextEditor.Toolbar>
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Bold />
						<RichTextEditor.Italic />
						<RichTextEditor.Underline />
						<RichTextEditor.Strikethrough />
						<RichTextEditor.ClearFormatting />
						<RichTextEditor.Highlight />
						<RichTextEditor.Code />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.H1 />
						<RichTextEditor.H2 />
						<RichTextEditor.H3 />
						<RichTextEditor.H4 />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Blockquote />
						<RichTextEditor.Hr />
						<RichTextEditor.BulletList />
						<RichTextEditor.OrderedList />
						<RichTextEditor.Subscript />
						<RichTextEditor.Superscript />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Link />
						<RichTextEditor.Unlink />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.AlignLeft />
						<RichTextEditor.AlignCenter />
						<RichTextEditor.AlignJustify />
						<RichTextEditor.AlignRight />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Undo />
						<RichTextEditor.Redo />
					</RichTextEditor.ControlsGroup>
				</RichTextEditor.Toolbar>

				<RichTextEditor.Content />
			</RichTextEditor>
		</ErrorTooltip>
	);
};

export default RichTextEditorComponent;
