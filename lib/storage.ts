"use client";

interface Conversation {
  id: number;
  title: string;
  model: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Message {
  id: number;
  conversationId: number;
  role: 'user' | 'assistant';
  content: string;
  attachments: any[];
  createdAt: Date;
}

class MemoryStorage {
  private conversations: Map<number, Conversation> = new Map();
  private messages: Map<number, Message[]> = new Map();
  private nextConversationId = 1;
  private nextMessageId = 1;

  async getConversations(): Promise<Conversation[]> {
    return Array.from(this.conversations.values())
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  async getConversation(id: number): Promise<Conversation | null> {
    return this.conversations.get(id) || null;
  }

  async createConversation(data: Omit<Conversation, 'id'>): Promise<Conversation> {
    const conversation: Conversation = {
      id: this.nextConversationId++,
      ...data,
    };
    this.conversations.set(conversation.id, conversation);
    this.messages.set(conversation.id, []);
    return conversation;
  }

  async updateConversation(id: number, data: Partial<Conversation>): Promise<Conversation | null> {
    const conversation = this.conversations.get(id);
    if (!conversation) return null;

    const updated = { ...conversation, ...data };
    this.conversations.set(id, updated);
    return updated;
  }

  async deleteConversation(id: number): Promise<boolean> {
    const deleted = this.conversations.delete(id);
    this.messages.delete(id);
    return deleted;
  }

  async getMessages(conversationId: number): Promise<Message[]> {
    return this.messages.get(conversationId) || [];
  }

  async createMessage(data: Omit<Message, 'id'>): Promise<Message> {
    const message: Message = {
      id: this.nextMessageId++,
      ...data,
    };

    const conversationMessages = this.messages.get(data.conversationId) || [];
    conversationMessages.push(message);
    this.messages.set(data.conversationId, conversationMessages);

    return message;
  }
}

export const storage = new MemoryStorage();
