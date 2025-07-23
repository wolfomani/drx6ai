"use client"

interface DocumentToolCallProps {
  type: string
  args: any
  isReadonly: boolean
}

export function DocumentToolCall({ type, args, isReadonly }: DocumentToolCallProps) {
  return (
    <div className="p-4 border rounded-lg bg-muted">
      <h4 className="font-medium mb-2">أداة المستند: {type}</h4>
      <pre className="text-sm">{JSON.stringify(args, null, 2)}</pre>
    </div>
  )
}

interface DocumentToolResultProps {
  type: string
  result: any
  isReadonly: boolean
}

export function DocumentToolResult({ type, result, isReadonly }: DocumentToolResultProps) {
  return (
    <div className="p-4 border rounded-lg bg-card">
      <h4 className="font-medium mb-2">نتيجة أداة المستند: {type}</h4>
      <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
    </div>
  )
}
