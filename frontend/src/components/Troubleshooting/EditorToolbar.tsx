import React from "react";
import { Editor } from "@tiptap/react";

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
          onClick={() => editor.chain().focus().setBlockquote().run()}
          disabled={!editor.can().setBlockquote()}
        >
          Set blockquote
        </button>
        <button
          onClick={() => editor.chain().focus().unsetBlockquote().run()}
          disabled={!editor.can().unsetBlockquote()}
        >
          Unset blockquote
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          Toggle code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={editor.isActive("taskList") ? "is-active" : ""}
        >
          Toggle task list
        </button>
        <button
          onClick={() => editor.chain().focus().splitListItem("taskItem").run()}
          disabled={!editor.can().splitListItem("taskItem")}
        >
          Split list item
        </button>
        <button
          onClick={() => editor.chain().focus().sinkListItem("taskItem").run()}
          disabled={!editor.can().sinkListItem("taskItem")}
        >
          Sink list item
        </button>
        <button
          onClick={() => editor.chain().focus().liftListItem("taskItem").run()}
          disabled={!editor.can().liftListItem("taskItem")}
        >
          Lift list item
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          Toggle ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().splitListItem("listItem").run()}
          disabled={!editor.can().splitListItem("listItem")}
        >
          Split list item
        </button>
        <button
          onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
          disabled={!editor.can().sinkListItem("listItem")}
        >
          Sink list item
        </button>
        <button
          onClick={() => editor.chain().focus().liftListItem("listItem").run()}
          disabled={!editor.can().liftListItem("listItem")}
        >
          Lift list item
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Set horizontal rule
        </button>
        <button onClick={addImage}>Set image</button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          Toggle bold
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
          Blue
        </button>
        <button
          onClick={setLink}
          className={editor.isActive("link") ? "is-active" : ""}
        >
          Set link
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
        >
          Unset link
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        >
          Left
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
        >
          Center
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        >
          Right
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
          }
        >
          Justify
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
