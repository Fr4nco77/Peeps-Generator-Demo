import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import Copy from "@/public/copy.svg";
import Check from "@/public/check.svg";
import { useState } from "react";

export default function CodeSnipet({
  code,
  styles,
}: {
  code: string;
  styles?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    setCopied(true);
    await navigator.clipboard.writeText(code);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`group relative ${styles}`}>
      <SyntaxHighlighter
        language="javascript"
        style={atomDark}
        customStyle={{ width: "100%" }}
      >
        {code}
      </SyntaxHighlighter>
      <button
        title="Copy"
        aria-label="Copy Text"
        onClick={handleClick}
        className="absolute top-7 right-4 size-4 cursor-pointer opacity-0 transition-all group-hover:opacity-100"
      >
        {copied ? (
          <Image src={Check} alt="Code copied" className="size-full" />
        ) : (
          <Image src={Copy} alt="Copy text" className="size-full" />
        )}
      </button>
    </div>
  );
}
