import React from "react";
import { Editor } from "@tiptap/react";
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaCode,
  FaHighlighter,
  FaImage,
  FaLink,
} from "react-icons/fa";
import { FaListCheck, FaSquarePollHorizontal } from "react-icons/fa6";
import { MdFormatListNumbered } from "react-icons/md";

const EditorToolbar = ({
  editor,
  addImage,
  setLink,
}: {
  editor: Editor;
  addImage: () => void;
  setLink: () => void;
}) => {
  return (
    <div className="border border-gray-300 rounded-lg p-3 mb-4">
      <div className="flex flex-wrap gap-2 mb-2">
        
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("codeBlock") ? "bg-blue-100" : ""}`}
          title="Code Block"
        >
          <FaCode/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("taskList") ? "bg-blue-100" : ""}`}
          title="Task List"
        >
          <FaListCheck/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("orderedList") ? "bg-blue-100" : ""}`}
          title="Numbered List"
        >
          <MdFormatListNumbered />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded hover:bg-gray-100"
          title="Horizontal Rule"
        >
          <FaSquarePollHorizontal />
        </button>
        <button 
          onClick={addImage}
          className="p-2 rounded hover:bg-gray-100"
          title="Add Image"
        >
          <FaImage />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("bold") ? "bg-blue-100" : ""}`}
          title="Bold"
        >
          <FaBold />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#74c0fc" }).run()
          }
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive("highlight", { color: "#74c0fc" })
              ? "bg-blue-100"
              : ""
          }`}
          title="Highlight"
        >
          <FaHighlighter />
        </button>
        <button
          onClick={setLink}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("link") ? "bg-blue-100" : ""}`}
          title="Add Link"
        >
          <FaLink />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: "left" }) ? "bg-blue-100" : ""}`}
          title="Align Left"
        >
          <FaAlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive({ textAlign: "center" }) ? "bg-blue-100" : ""
          }`}
          title="Align Center"
        >
          <FaAlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: "right" }) ? "bg-blue-100" : ""}`}
          title="Align Right"
        >
          <FaAlignRight />
        </button>

        <input
          type="color"
          onInput={(event) =>
            editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()
          }
          value={editor.getAttributes("textStyle").color || "#000000"}
          className="w-8 h-8 rounded border-none"
          title="Text Color"
        />
        
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="p-2 rounded hover:bg-gray-100 text-sm"
          title="Insert Line Break"
        >
          ↵
        </button>
      </div>
      
      <div className="text-xs text-gray-600 border-t pt-2">
        <p>💡 <strong>줄바꿈 팁:</strong> Enter = 새 문단, Shift + Enter = 줄바꿈, ↵ 버튼 = 줄바꿈 삽입</p>
      </div>
    </div>
  );
};

export default EditorToolbar;
