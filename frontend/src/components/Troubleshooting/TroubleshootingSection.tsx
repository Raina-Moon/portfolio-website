"use client";

import React, { useCallback } from "react";
import { EditorContent } from "@tiptap/react";
import EditorToolbar from "./EditorToolbar";
import { useTiptapEditor } from "@/hooks/useTiptapEditor";

const TroubleshootingSection = () => {
  const editor = useTiptapEditor();

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (editor && url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

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
    </div>
  );
};

export default TroubleshootingSection;
