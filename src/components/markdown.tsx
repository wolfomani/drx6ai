"use client"

import type { ReactNode } from "react"

interface MarkdownProps {
  children: string
}

export function Markdown({ children }: MarkdownProps) {
  // تحويل بسيط للـ Markdown إلى HTML
  const formatText = (text: string): ReactNode => {
    // تحويل النص الغامق **text** إلى <strong>
    let formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

    // تحويل النص المائل *text* إلى <em>
    formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>")

    // تحويل الكود `code` إلى <code>
    formatted = formatted.replace(/`(.*?)`/g, "<code>$1</code>")

    // تحويل الروابط [text](url) إلى <a>
    formatted = formatted.replace(
      /\[([^\]]+)\]$$([^)]+)$$/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    )

    return <div className="markdown-content" dangerouslySetInnerHTML={{ __html: formatted }} />
  }

  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      {children.split("\n").map((line, index) => (
        <div key={index} className="mb-2">
          {formatText(line)}
        </div>
      ))}
    </div>
  )
}
