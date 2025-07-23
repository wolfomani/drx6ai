"use client"

interface PreviewAttachmentProps {
  attachment: {
    name: string
    contentType?: string
    url: string
  }
}

export function PreviewAttachment({ attachment }: PreviewAttachmentProps) {
  return (
    <div className="flex items-center gap-2 p-2 border rounded-lg bg-muted">
      <div className="text-sm font-medium">{attachment.name}</div>
    </div>
  )
}
