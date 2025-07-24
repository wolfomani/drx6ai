import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatRequestSchema, insertConversationSchema, insertMessageSchema } from "@shared/schema";
import { AIProviderFactory } from "./services/ai-providers";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all AI models
  app.get("/api/models", async (req, res) => {
    try {
      const models = await storage.getAiModels();
      res.json(models);
    } catch (error) {
      console.error('Get models error:', error);
      res.status(500).json({ message: "فشل في جلب النماذج" });
    }
  });

  // Get all conversations
  app.get("/api/conversations", async (req, res) => {
    try {
      const conversations = await storage.getConversations();
      res.json(conversations);
    } catch (error) {
      console.error('Get conversations error:', error);
      res.status(500).json({ message: "فشل في جلب المحادثات" });
    }
  });

  // Get specific conversation
  app.get("/api/conversations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const conversation = await storage.getConversation(id);
      if (!conversation) {
        return res.status(404).json({ message: "المحادثة غير موجودة" });
      }
      res.json(conversation);
    } catch (error) {
      console.error('Get conversation error:', error);
      res.status(500).json({ message: "فشل في جلب المحادثة" });
    }
  });

  // Get messages for a conversation
  app.get("/api/conversations/:id/messages", async (req, res) => {
    try {
      const conversationId = parseInt(req.params.id);
      const messages = await storage.getMessages(conversationId);
      res.json(messages);
    } catch (error) {
      console.error('Get messages error:', error);
      res.status(500).json({ message: "فشل في جلب الرسائل" });
    }
  });

  // Create new conversation
  app.post("/api/conversations", async (req, res) => {
    try {
      const validatedData = insertConversationSchema.parse(req.body);
      const conversation = await storage.createConversation(validatedData);
      res.status(201).json(conversation);
    } catch (error) {
      console.error('Create conversation error:', error);
      res.status(400).json({ message: "بيانات غير صحيحة لإنشاء المحادثة" });
    }
  });

  // Send chat message
  app.post("/api/chat", async (req, res) => {
    try {
      const validatedData = chatRequestSchema.parse(req.body);
      const { message, conversationId, model, attachments } = validatedData;

      // Check if AI provider is available
      const provider = AIProviderFactory.getProvider(model);
      if (!provider) {
        return res.status(400).json({ message: "النموذج المحدد غير متاح" });
      }

      if (!provider.isAvailable()) {
        return res.status(503).json({ message: `${provider.getName()} غير متاح حالياً` });
      }

      let currentConversationId = conversationId;

      // Create new conversation if none provided
      if (!currentConversationId) {
        const newConversation = await storage.createConversation({
          title: message.slice(0, 50) + (message.length > 50 ? '...' : ''),
          model,
        });
        currentConversationId = newConversation.id;
      }

      // Save user message
      const userMessage = await storage.createMessage({
        conversationId: currentConversationId,
        role: 'user',
        content: message,
        attachments,
      });

      // Generate AI response
      try {
        const aiResponse = await provider.generateResponse(message);
        
        // Save AI message
        const aiMessage = await storage.createMessage({
          conversationId: currentConversationId,
          role: 'assistant',
          content: aiResponse,
        });

        // Update conversation timestamp
        await storage.updateConversation(currentConversationId, {
          updatedAt: new Date(),
        });

        res.json({
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
          content: `عذراً، حدث خطأ أثناء معالجة طلبك: ${aiError instanceof Error ? aiError.message : 'خطأ غير معروف'}`,
        });

        res.status(500).json({
          message: errorMessage.content,
          conversationId: currentConversationId,
          messageId: errorMessage.id,
        });
      }

    } catch (error) {
      console.error('Chat error:', error);
      res.status(400).json({ message: "بيانات الطلب غير صحيحة" });
    }
  });

  // Delete conversation
  app.delete("/api/conversations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteConversation(id);
      if (!deleted) {
        return res.status(404).json({ message: "المحادثة غير موجودة" });
      }
      res.json({ message: "تم حذف المحادثة بنجاح" });
    } catch (error) {
      console.error('Delete conversation error:', error);
      res.status(500).json({ message: "فشل في حذف المحادثة" });
    }
  });

  // File upload endpoint
  app.post("/api/upload", async (req, res) => {
    try {
      // TODO: Implement file upload logic with multer
      res.status(501).json({ message: "رفع الملفات قيد التطوير" });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ message: "فشل في رفع الملف" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
