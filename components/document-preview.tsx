"use client"

interface DocumentPreviewProps {
  isReadonly: boolean
  args?: any
  result?: any
}

export function DocumentPreview({ isReadonly, args, result }: DocumentPreviewProps) {
  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="font-semibold mb-2">معاينة المستند</h3>
      {args && (
        <div className="mb-2">
          <h4 className="font-medium">المعاملات:</h4>
          <pre className="text-sm">{JSON.stringify(args, null, 2)}</pre>
        </div>
      )}
      {result && (
        <div>
          <h4 className="font-medium">النتيجة:</h4>
          <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
