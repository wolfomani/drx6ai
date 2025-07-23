import { conversations, messages, aiModels, type Conversation, type Message, type AiModel, type InsertConversation, type InsertMessage, type InsertAiModel } from "@shared/schema";

export interface IStorage {
  // Conversations
  getConversation(id: number): Promise<Conversation | undefined>;
  getConversations(): Promise<Conversation[]>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  updateConversation(id: number, updates: Partial<Conversation>): Promise<Conversation | undefined>;
  deleteConversation(id: number): Promise<boolean>;

  // Messages
  getMessage(id: number): Promise<Message | undefined>;
  getMessages(conversationId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  deleteMessage(id: number): Promise<boolean>;

  // AI Models
  getAiModel(id: string): Promise<AiModel | undefined>;
  getAiModels(): Promise<AiModel[]>;
  createAiModel(model: InsertAiModel): Promise<AiModel>;
  updateAiModel(id: string, updates: Partial<AiModel>): Promise<AiModel | undefined>;
}

export class MemStorage implements IStorage {
  private conversations: Map<number, Conversation>;
  private messages: Map<number, Message>;
  private aiModels: Map<string, AiModel>;
  private currentConversationId: number;
  private currentMessageId: number;

  constructor() {
    this.conversations = new Map();
    this.messages = new Map();
    this.aiModels = new Map();
    this.currentConversationId = 1;
    this.currentMessageId = 1;

    // Initialize default AI models
    this.initializeDefaultModels();
  }

  private initializeDefaultModels() {
    const defaultModels: AiModel[] = [
      {
        id: 'deepseek',
        name: 'DeepSeek',
        description: 'نموذج التفكير المتقدم',
        provider: 'deepseek',
        available: true,
        features: ['text', 'reasoning', 'cognitive'],
        icon: 'DS',
        color: 'blue'
      },
      {
        id: 'groq',
        name: 'Groq',
        description: 'استجابة فورية',
        provider: 'groq',
        available: true,
        features: ['text', 'ultra-fast'],
        icon: 'GQ',
        color: 'orange'
      },
      {
        id: 'together',
        name: 'Together',
        description: 'مفتوح المصدر',
        provider: 'together',
        available: true,
        features: ['text', 'open-source'],
        icon: 'TG',
        color: 'purple'
      },
      {
        id: 'gemini',
        name: 'Gemini',
        description: 'ذكي ومتعدد المهام',
        provider: 'gemini',
        available: true,
        features: ['text', 'multimodal', 'images'],
        icon: 'GM',
        color: 'green'
      }
    ];

    defaultModels.forEach(model => {
      this.aiModels.set(model.id, model);
    });
  }

  // Conversations
  async getConversation(id: number): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }

  async getConversations(): Promise<Conversation[]> {
    return Array.from(this.conversations.values()).sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const id = this.currentConversationId++;
    const now = new Date();
    const conversation: Conversation = {
      ...insertConversation,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.conversations.set(id, conversation);
    return conversation;
  }

  async updateConversation(id: number, updates: Partial<Conversation>): Promise<Conversation | undefined> {
    const conversation = this.conversations.get(id);
    if (!conversation) return undefined;

    const updated: Conversation = {
      ...conversation,
      ...updates,
      updatedAt: new Date(),
    };
    this.conversations.set(id, updated);
    return updated;
  }

  async deleteConversation(id: number): Promise<boolean> {
    const deleted = this.conversations.delete(id);
    if (deleted) {
      // Also delete all messages in this conversation
      const messagesToDelete = Array.from(this.messages.values())
        .filter(msg => msg.conversationId === id);
      messagesToDelete.forEach(msg => this.messages.delete(msg.id));
    }
    return deleted;
  }

  // Messages
  async getMessage(id: number): Promise<Message | undefined> {
    return this.messages.get(id);
  }

  async getMessages(conversationId: number): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(msg => msg.conversationId === conversationId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: new Date(),
      attachments: insertMessage.attachments || null,
    };
    this.messages.set(id, message);
    return message;
  }

  async deleteMessage(id: number): Promise<boolean> {
    return this.messages.delete(id);
  }

  // AI Models
  async getAiModel(id: string): Promise<AiModel | undefined> {
    return this.aiModels.get(id);
  }

  async getAiModels(): Promise<AiModel[]> {
    return Array.from(this.aiModels.values());
  }

  async createAiModel(model: InsertAiModel): Promise<AiModel> {
    const aiModel: AiModel = {
      ...model,
      available: model.available ?? true,
      features: model.features || null,
      icon: model.icon || null,
      color: model.color || null,
    };
    this.aiModels.set(model.id, aiModel);
    return aiModel;
  }

  async updateAiModel(id: string, updates: Partial<AiModel>): Promise<AiModel | undefined> {
    const model = this.aiModels.get(id);
    if (!model) return undefined;

    const updated: AiModel = { ...model, ...updates };
    this.aiModels.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
