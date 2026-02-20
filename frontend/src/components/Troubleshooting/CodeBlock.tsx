"use client";

import React, { useEffect, useRef, useState } from "react";

const COLLAPSED_HEIGHT = 200;

const CodeBlock = ({
  code,
  children,
}: {
  code: string;
  children: React.ReactNode;
}) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = codeRef.current;
    if (el && el.scrollHeight > COLLAPSED_HEIGHT) {
      setIsOverflow(true);
    }
  }, [children]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <pre className="macos-codeblock">
      <div className="macos-titlebar">
        <div className="macos-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <button
          onClick={handleCopy}
          className={`copy-btn ${copied ? "copied" : ""}`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <code
        ref={codeRef}
        className="block overflow-hidden transition-[max-height] duration-300"
        style={{
          maxHeight: isOverflow && !expanded ? `${COLLAPSED_HEIGHT}px` : "none",
        }}
      >
        {children}
      </code>
      {isOverflow && (
        <>
          {!expanded && <div className="code-fade" />}
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="read-more-btn"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        </>
      )}
    </pre>
  );
};

export default CodeBlock;
