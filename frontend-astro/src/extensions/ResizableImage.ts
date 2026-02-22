import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ResizableImageView from "@/components/Troubleshooting/ResizableImageView";

const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "100%",
        parseHTML: (element) => element.getAttribute("width") || element.style.width || "100%",
        renderHTML: (attributes) => ({
          width: attributes.width,
          style: `width: ${attributes.width}`,
        }),
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageView);
  },
});

export default ResizableImage;
