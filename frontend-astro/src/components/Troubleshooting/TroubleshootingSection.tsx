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
    const [tagInput, setTagInput] = useState("");
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

    const addTag = (value: string) => {
      const trimmed = value.trim();
      if (trimmed && !tags.includes(trimmed)) {
        setTags([...tags, trimmed]);
      }
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value.includes(",")) {
        const parts = value.split(",");
        parts.slice(0, -1).forEach(addTag);
        setTagInput(parts[parts.length - 1]);
      } else {
        setTagInput(value);
      }
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTag(tagInput);
        setTagInput("");
      } else if (e.key === "Backspace" && !tagInput && tags.length > 0) {
        setTags(tags.slice(0, -1));
      }
    };

    const removeTag = (index: number) => {
      setTags(tags.filter((_, i) => i !== index));
    };

    if (!editor) {
      return null;
    }

    return (
      <div className="space-y-5">
        {/* Title */}
        <div>
          <label htmlFor="post-title" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Title
          </label>
          <input
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 text-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
          />
        </div>

        {/* Editor */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Content
          </label>
          <EditorToolbar editor={editor} addImage={addImage} setLink={setLink} />
          <EditorContent editor={editor} />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="post-tags" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Tags
          </label>
          <div className="flex flex-wrap items-center gap-2 px-3 py-2.5 border border-gray-300 rounded-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15 min-h-[44px]">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(i)}
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200 text-blue-600 text-xs leading-none"
                >
                  &times;
                </button>
              </span>
            ))}
            <input
              id="post-tags"
              value={tagInput}
              onChange={handleTagChange}
              onKeyDown={handleTagKeyDown}
              placeholder={tags.length === 0 ? "Type a tag and press Enter..." : ""}
              className="flex-1 min-w-[120px] outline-none text-gray-900 text-sm py-0.5 bg-transparent"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">Press Enter or comma to add a tag. Backspace to remove.</p>
        </div>
      </div>
    );
  }
);

TroubleshootingSection.displayName = "TroubleshootingSection";

export default TroubleshootingSection;
