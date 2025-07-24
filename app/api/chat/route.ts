export async function POST(req: Request) {
  import { NextRequest, NextResponse } from "next/server";
  import { storage } from "@/lib/storage";
  import { AIProviderFactory } from "@/lib/ai-providers";

  export async function POST(request: NextRequest) {
    try {
      const body = await request.json();
      const { message, conversationId, model, attachments } = body;

      if (!message || !message.trim()) {
        return NextResponse.json(
          { message: "الرسالة مطلوبة" },
          { status: 400 }
        );
      }

      if (!model) {
        return NextResponse.json(
          { message: "النموذج مطلوب" },
          { status: 400 }
        );
      }

      // Get AI provider
      const provider = AIProviderFactory.getProvider(model);
      if (!provider) {
        return NextResponse.json(
          { message: "النموذج المحدد غير متاح" },
          { status: 400 }
        );
      }

      if (!provider.isAvailable()) {
        return NextResponse.json(
          { message: `${provider.getName()} غير متاح حالياً` },
          { status: 503 }
        );
      }

      let currentConversationId = conversationId;

      // Create new conversation if none provided
      if (!currentConversationId) {
        const newConversation = await storage.createConversation({
          title: message.slice(0, 50) + (message.length > 50 ? '...' : ''),
          model,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        currentConversationId = newConversation.id;
      }

      // Save user message
      const userMessage = await storage.createMessage({
        conversationId: currentConversationId,
        role: 'user',
        content: message.trim(),
        attachments: attachments || [],
        createdAt: new Date(),
      });

      // Generate AI response
      try {
        const aiResponse = await provider.generateResponse(message.trim());
      
        // Save AI message
        const aiMessage = await storage.createMessage({
          conversationId: currentConversationId,
          role: 'assistant',
          content: aiResponse,
          attachments: [],
          createdAt: new Date(),
        });

        // Update conversation timestamp
        await storage.updateConversation(currentConversationId, {
          updatedAt: new Date(),
        });

        return NextResponse.json({
          message: aiResponse,
          conversationId: currentConversationId,
          messageId: aiMessage.id,
        });

      } catch (aiError) {
        console.error('AI Provider Error:', aiError);
      
        // Save error message from AI
        const errorMessage = await storage.createMessage({
          conversationId: currentConversationId,
          role: 'assistant',
          content: `عذراً، حدث خطأ أثناء معالجة طلبك. ${aiError instanceof Error ? aiError.message : 'خطأ غير معروف'}`,
          attachments: [],
          createdAt: new Date(),
        });

        return NextResponse.json({
          message: errorMessage.content,
          conversationId: currentConversationId,
          messageId: errorMessage.id,
        }, { status: 500 });
      }

    } catch (error) {
      console.error('Chat error:', error);
      return NextResponse.json(
        { message: "خطأ في معالجة الطلب" },
        { status: 500 }
      );
    }
  }
}
