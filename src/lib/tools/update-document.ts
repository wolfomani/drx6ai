import { tool, type UIMessageStreamWriter } from "ai"
import { z } from "zod"
import type { Session } from "next-auth"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  reasoning?: string
}

interface UpdateDocumentProps {
  session?: Session
  dataStream: UIMessageStreamWriter<ChatMessage>
}

export const updateDocument = ({ session, dataStream }: UpdateDocumentProps) =>
  tool({
    description: "تحديث مستند موجود بناءً على الوصف المعطى.",
    inputSchema: z.object({
      id: z.string().describe("معرف المستند المراد تحديثه"),
      description: z.string().describe("وصف التغييرات المطلوب إجراؤها"),
    }),
    execute: async ({ id, description }) => {
      // محاكاة البحث عن المستند
      const document = {
        id,
        title: "مستند تجريبي",
        kind: "text" as const,
        content: "محتوى المستند الحالي",
      }

      if (!document) {
        return {
          error: "المستند غير موجود",
        }
      }

      dataStream.write({
        type: "data-clear",
        data: null,
        transient: true,
      })

      // محاكاة تحديث المحتوى
      const updatedContent = `${document.content}\n\nتحديث: ${description}`

      // كتابة المحتوى المحدث تدريجياً
      for (let i = 0; i < updatedContent.length; i += 15) {
        const chunk = updatedContent.slice(i, i + 15)
        dataStream.write({
          type: "data-content",
          data: chunk,
          transient: true,
        })
        await new Promise((resolve) => setTimeout(resolve, 30))
      }

      dataStream.write({ type: "data-finish", data: null, transient: true })

      return {
        id,
        title: document.title,
        kind: document.kind,
        content: "تم تحديث المستند بنجاح.",
      }
    },
  })
