interface MarkdownProps {
  children: string
}

export function Markdown({ children }: MarkdownProps) {
  if (!children) return null

  // تحويل بسيط للـ Markdown
  const processMarkdown = (text: string) => {
    // تحويل النص المائل
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    text = text.replace(/\*(.*?)\*/g, "<em>$1</em>")

    // تحويل الروابط
    text = text.replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

    // تحويل الأسطر الجديدة
    text = text.replace(/\n/g, "<br />")

    return text
  }

  return <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: processMarkdown(children) }} />
}
