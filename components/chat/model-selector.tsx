export default function FixedComponent() {
  "use client"

  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
  import { useQuery } from "@tanstack/react-query"
  import { Loader2 } from "lucide-react"

  interface ModelSelectorProps {
    selectedModel: string
    onSelectModel: (modelId: string) => void
  }

  interface Model {
    id: string
    name: string
    provider: string
  }

  export function ModelSelector({ selectedModel, onSelectModel }: ModelSelectorProps) {
    const {
      data: models,
      isLoading,
      isError,
    } = useQuery<Model[]>({
      queryKey: ["models"],
      queryFn: async () => {
        const response = await fetch("/api/models")
        if (!response.ok) {
          throw new Error("Failed to fetch models")
        }
        return response.json()
      },
    })

    if (isLoading) {
      return (
        <div className="flex items-center gap-2 text-text-secondary">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading models...</span>
        </div>
      )
    }

    if (isError) {
      return <div className="text-destructive">Error loading models</div>
    }

    return (
      <Select value={selectedModel} onValueChange={onSelectModel}>
        <SelectTrigger className="w-[180px] bg-dark-surface border-border-dark text-text-primary focus:ring-dr-blue">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent className="bg-dark-surface border-border-dark text-text-primary">
          {models?.map((model) => (
            <SelectItem key={model.id} value={model.id} className="hover:bg-dark-surface-hover">
              {model.name} ({model.provider})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }
}
