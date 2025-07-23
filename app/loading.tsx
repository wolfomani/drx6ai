import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-20 h-6" />
          </div>
          <Skeleton className="w-32 h-10" />
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-end">
            <Skeleton className="w-64 h-12 rounded-lg" />
          </div>
          <div className="flex justify-start">
            <Skeleton className="w-80 h-16 rounded-lg" />
          </div>
          <div className="flex justify-end">
            <Skeleton className="w-48 h-10 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="w-full h-12 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
