export default function FixedComponent() {
  import { cn } from "@/lib/utils"
  import { CheckCircle, XCircle } from "lucide-react"

  interface ModelStatusIndicatorProps {
    modelName: string
    isOnline?: boolean // Assuming models are generally online for simplicity, can be extended
  }

  export function ModelStatusIndicator({
    modelName,
    isOnline = true, // Default to online
  }: ModelStatusIndicatorProps) {
    return (
      <div className={cn("flex items-center gap-2 text-sm", isOnline ? "text-green-500" : "text-red-500")}>
        {isOnline ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
        <span>
          {modelName} {isOnline ? "Online" : "Offline"}
        </span>
      </div>
    )
  }
}
