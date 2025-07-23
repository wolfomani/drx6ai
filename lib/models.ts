export const models = [
  {
    id: "chat-model",
    name: "Grok Vision",
    description: "نموذج متقدم للدردشة مع دعم الصور",
    provider: "xAI",
    maxTokens: 4096,
    supportsReasoning: false,
  },
  {
    id: "chat-model-reasoning",
    name: "Grok Reasoning",
    description: "نموذج متقدم مع قدرات التفكير العميق",
    provider: "xAI",
    maxTokens: 4096,
    supportsReasoning: true,
  },
  {
    id: "title-model",
    name: "Grok Title",
    description: "نموذج لإنشاء العناوين",
    provider: "xAI",
    maxTokens: 1024,
    supportsReasoning: false,
  },
] as const

export type ModelId = (typeof models)[number]["id"]
