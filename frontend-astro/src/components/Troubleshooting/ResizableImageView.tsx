"use client";

import { NodeViewWrapper } from "@tiptap/react";
import React, { useCallback, useRef, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ResizableImageView = ({ node, updateAttributes, selected }: any) => {
  const [resizing, setResizing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const currentWidth = node.attrs.width || "100%";

  const onMouseDown = useCallback(
    (e: React.MouseEvent, direction: "left" | "right") => {
      e.preventDefault();
      e.stopPropagation();
      setResizing(true);

      const img = imgRef.current;
      if (!img) return;

      startX.current = e.clientX;
      startWidth.current = img.offsetWidth;

      const onMouseMove = (ev: MouseEvent) => {
        const diff = direction === "right"
          ? ev.clientX - startX.current
          : startX.current - ev.clientX;
        const newWidth = Math.max(80, startWidth.current + diff);
        updateAttributes({ width: `${newWidth}px` });
      };

      const onMouseUp = () => {
        setResizing(false);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [updateAttributes]
  );

  return (
    <NodeViewWrapper className="resizable-image-wrapper">
      <div className={`resizable-image ${selected || resizing ? "selected" : ""}`}>
        <img
          ref={imgRef}
          src={node.attrs.src}
          alt={node.attrs.alt || ""}
          style={{ width: currentWidth }}
          draggable={false}
        />
        {(selected || resizing) && (
          <>
            <div
              className="resize-handle left"
              onMouseDown={(e) => onMouseDown(e, "left")}
            />
            <div
              className="resize-handle right"
              onMouseDown={(e) => onMouseDown(e, "right")}
            />
          </>
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default ResizableImageView;
