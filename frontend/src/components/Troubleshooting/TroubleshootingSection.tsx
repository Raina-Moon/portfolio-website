"use client";

import React, { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { EditorContent } from "@tiptap/react";
import EditorToolbar from "./EditorToolbar";
import { useTiptapEditor } from "@/hooks/useTiptapEditor";
import { uploadImageToCloudinary } from "@/hooks/uploadImageToCloudinary";

export interface TroubleshootingSectionHandler {
  getValues: () => {
    title: string;
    content: string;
    tags: string[];
  };
}

interface TroubleshootingSectionProps {
  initialTitle?: string;
  initialTags?: string[];
  initialContent?: string;
  postId?: number;
}

const TroubleshootingSection = forwardRef<
  TroubleshootingSectionHandler,
  TroubleshootingSectionProps
>(
  (
    { initialTitle = "", initialTags = [], initialContent = "" },
    ref
  ) => {
    const [title, setTitle] = useState(initialTitle);
    const [tags, setTags] = useState<string[]>(initialTags);
    const editor = useTiptapEditor(initialContent);

    useImperativeHandle(ref, () => ({
      getValues: () => ({
        title,
        content: editor?.getHTML() || "",
        tags,
      }),
    }));

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
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제목
          </label>
          <input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
            placeholder="글 제목을 입력하세요..."
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            내용
          </label>
          <EditorToolbar editor={editor} addImage={addImage} setLink={setLink} />
          <EditorContent 
            editor={editor} 
            className="prose prose-lg max-w-none min-h-[300px] border border-gray-300 rounded-lg p-4
                       [&_.ProseMirror]:focus:outline-none
                       [&_.ProseMirror]:min-h-[250px]
                       [&_p]:mb-2
                       [&_br]:block [&_br]:mb-1
                       [&_.hard-break]:block [&_.hard-break]:mb-1"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            태그
          </label>
          <input
            type="text"
            value={tags.join(", ")}
            onChange={(e) =>
              setTags(e.target.value.split(",").map((tag) => tag.trim()))
            }
            placeholder="태그를 쉼표로 구분하여 입력하세요 (예: React, JavaScript, Frontend)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <p className="text-sm text-gray-500 mt-1">
            입력된 태그: {tags.filter(tag => tag.length > 0).map((tag, index) => (
              <span key={index} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mr-1 mt-1">
                {tag}
              </span>
            ))}
          </p>
        </div>
      </div>
    );
  }
);

TroubleshootingSection.displayName = "TroubleshootingSection";

export default TroubleshootingSection;
