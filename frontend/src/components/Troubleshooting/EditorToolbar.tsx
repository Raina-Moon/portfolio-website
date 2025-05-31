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
    <div className="control-group">
      <div className="button-group">
        
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          <FaCode/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={editor.isActive("taskList") ? "is-active" : ""}
        >
          <FaListCheck/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <MdFormatListNumbered />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <FaSquarePollHorizontal />
        </button>
        <button onClick={addImage}>
          <FaImage />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <FaBold />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#74c0fc" }).run()
          }
          className={
            editor.isActive("highlight", { color: "#74c0fc" })
              ? "is-active"
              : ""
          }
        >
          <FaHighlighter />
        </button>
        <button
          onClick={setLink}
          className={editor.isActive("link") ? "is-active" : ""}
        >
          <FaLink />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        >
          <FaAlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
        >
          <FaAlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        >
          <FaAlignRight />
        </button>

        <input
          type="color"
          onInput={(event) =>
            editor.chain().focus().setColor(event.target.value()).run()
          }
          value={editor.getAttributes("textStyle").color}
          data-testid="setColor"
        />
      </div>
    </div>
  );
};

export default EditorToolbar;
