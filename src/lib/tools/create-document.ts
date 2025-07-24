import { generateUUID } from "@/lib/utils"
import { tool, type UIMessageStreamWriter } from "ai"
import { z } from "zod"
import type { Session } from "next-auth"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  reasoning?: string
}

const artifactKinds = ["text", "code", "sheet"] as const
export type ArtifactKind = (typeof artifactKinds)[number]

interface CreateDocumentProps {
  session?: Session
  dataStream: UIMessageStreamWriter<ChatMessage>
}

export const createDocument = ({ session, dataStream }: CreateDocumentProps) =>
  tool({
    description:
      "إنشاء مستند للكتابة أو أنشطة إنشاء المحتوى. ستستدعي هذه الأداة وظائف أخرى لإنشاء محتويات المستند بناءً على العنوان والنوع.",
    inputSchema: z.object({
      title: z.string().describe("عنوان المستند"),
      kind: z.enum(artifactKinds).describe("نوع المستند: نص، كود، أو جدول بيانات"),
    }),
    execute: async ({ title, kind }) => {
      const id = generateUUID()

      dataStream.write({
        type: "data-kind",
        data: kind,
        transient: true,
      })

      dataStream.write({
        type: "data-id",
        data: id,
        transient: true,
      })

      dataStream.write({
        type: "data-title",
        data: title,
        transient: true,
      })

      dataStream.write({
        type: "data-clear",
        data: null,
        transient: true,
      })

      // محاكاة إنشاء المحتوى
      let content = ""
      switch (kind) {
        case "text":
          content = `# ${title}\n\nهذا مستند نصي تم إنشاؤه تلقائياً.\n\nيمكنك تعديل هذا المحتوى حسب احتياجاتك.`
          break
        case "code":
          content = `# ${title}\n\n\`\`\`python\n# كود Python تجريبي\nprint("مرحباً بك في ${title}")\n\`\`\``
          break
        case "sheet":
          content = `العمود 1,العمود 2,العمود 3\nالقيمة 1,القيمة 2,القيمة 3\nالقيمة 4,القيمة 5,القيمة 6`
          break
      }

      // كتابة المحتوى تدريجياً
      for (let i = 0; i < content.length; i += 10) {
        const chunk = content.slice(i, i + 10)
        dataStream.write({
          type: "data-content",
          data: chunk,
          transient: true,
        })
        await new Promise((resolve) => setTimeout(resolve, 50))
      }

      dataStream.write({ type: "data-finish", data: null, transient: true })

      return {
        id,
        title,
        kind,
        content: "تم إنشاء المستند وهو مرئي الآن للمستخدم.",
      }
    },
  })
