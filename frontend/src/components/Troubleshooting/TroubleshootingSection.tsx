"use client";

import React, { useCallback, useState } from "react";
import { EditorContent } from "@tiptap/react";
import EditorToolbar from "./EditorToolbar";
import { useTiptapEditor } from "@/hooks/useTiptapEditor";
import { createTroubleshootingPost } from "@/libs/api/troubleshooting";
import { uploadImageToCloudinary } from "@/hooks/uploadImageToCloudinary";

const TroubleshootingSection = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const editor = useTiptapEditor();

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const files = input.files?.[0];
      if (!files) return;

      try {
        const imageUrl = await uploadImageToCloudinary(files);
        editor?.chain().focus().setImage({ src: imageUrl }).run();
      } catch (err) {
        console.error("Failed to upload image:", err);
        alert("Failed to upload image. Please try again.");
      }
    };

    input.click();
  };

  const saveContent = async () => {
    const html = editor?.getHTML() ?? "";
    console.log("Saving content:", { title, html, tags });

    await createTroubleshootingPost(title, html, tags);
  };

  const setLink = useCallback(() => {
    if (!editor) {
      return;
    }
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      alert((e as Error).message);
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <EditorToolbar editor={editor} addImage={addImage} setLink={setLink} />

      <EditorContent editor={editor} />
      <p>Tags</p>
      <input
        type="text"
        value={tags.join(", ")}
        onChange={(e) =>
          setTags(e.target.value.split(",").map((tag) => tag.trim()))
        }
        placeholder="Enter tags separated by commas"
      />
      <button onClick={saveContent}>Save</button>
    </div>
  );
};

export default TroubleshootingSection;
