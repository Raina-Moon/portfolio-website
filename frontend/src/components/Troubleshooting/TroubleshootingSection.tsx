"use client";

import React, { useCallback } from "react";
import { EditorContent } from "@tiptap/react";
import EditorToolbar from "./EditorToolbar";
import { useTiptapEditor } from "@/hooks/useTiptapEditor";
import { createTroubleshootingPost } from "@/libs/api/troubleshooting";

const TroubleshootingSection = () => {
  const editor = useTiptapEditor();

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (editor && url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const saveContent = async() => {
    const html = editor?.getHTML() ?? "";

    await createTroubleshootingPost(html);
  }

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
      <EditorToolbar editor={editor} addImage={addImage} setLink={setLink} />

      <EditorContent editor={editor} />
      <button onClick={saveContent}>Save</button>
    </div>
  );
};

export default TroubleshootingSection;
