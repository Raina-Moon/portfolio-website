import { useEffect, useMemo, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

interface EncryptedTextProps {
  text: string;
  encryptedClassName?: string;
  revealedClassName?: string;
  revealDelayMs?: number;
}

export function EncryptedText({
  text,
  encryptedClassName = "",
  revealedClassName = "",
  revealDelayMs = 50,
}: EncryptedTextProps) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setRevealedCount(0);
    const revealTimer = window.setInterval(() => {
      setRevealedCount((prev) => {
        if (prev >= text.length) {
          window.clearInterval(revealTimer);
          return prev;
        }
        return prev + 1;
      });
    }, revealDelayMs);

    return () => window.clearInterval(revealTimer);
  }, [text, revealDelayMs]);

  useEffect(() => {
    if (revealedCount >= text.length) return;
    const scrambleTimer = window.setInterval(() => {
      setTick((prev) => prev + 1);
    }, 45);
    return () => window.clearInterval(scrambleTimer);
  }, [revealedCount, text.length]);

  const rendered = useMemo(() => {
    return text.split("").map((char, index) => {
      const isRevealed = index < revealedCount || char === " ";
      const displayChar = isRevealed
        ? char
        : CHARS[(index * 13 + tick * 7) % CHARS.length];
      const className = isRevealed ? revealedClassName : encryptedClassName;

      return (
        <span key={`${index}-${char}`} className={className}>
          {displayChar}
        </span>
      );
    });
  }, [encryptedClassName, revealedClassName, revealedCount, text, tick]);

  return <>{rendered}</>;
}

