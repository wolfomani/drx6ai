import { type NextRequest, NextResponse } from "next/server"
import { sendMessage } from "@/lib/ai-providers"

export async function POST(request: NextRequest) {
  try {
    const { provider, model, messages, stream = false } = await request.json()

    if (!provider || !model || !messages) {
      return NextResponse.json({ error: "Missing required fields: provider, model, messages" }, { status: 400 })
    }

    const response = await sendMessage(provider, model, messages, stream)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API Error (${response.status}):`, errorText)
      return NextResponse.json({ error: `API request failed: ${response.status}` }, { status: response.status })
    }

    if (stream) {
      // Handle streaming response
      return new NextResponse(response.body, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      })
    } else {
      // Handle regular response
      const data = await response.json()

      // Normalize response format across providers
      let content = ""

      if (provider === "gemini") {
        content = data.candidates?.[0]?.content?.parts?.[0]?.text || ""
      } else {
        content = data.choices?.[0]?.message?.content || ""
      }

      return NextResponse.json({
        content,
        provider,
        model,
        usage: data.usage,
      })
    }
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
