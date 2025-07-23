import { apiRequest } from "./queryClient";
import type { ChatRequest, ChatResponse } from "@shared/schema";

export class AIService {
  static async sendMessage(data: ChatRequest): Promise<ChatResponse> {
    const response = await apiRequest("POST", "/api/chat", data);
    return response.json();
  }

  static async getModels() {
    const response = await apiRequest("GET", "/api/models");
    return response.json();
  }

  static async getConversations() {
    const response = await apiRequest("GET", "/api/conversations");
    return response.json();
  }

  static async getConversation(id: number) {
    const response = await apiRequest("GET", `/api/conversations/${id}`);
    return response.json();
  }

  static async getMessages(conversationId: number) {
    const response = await apiRequest("GET", `/api/conversations/${conversationId}/messages`);
    return response.json();
  }

  static async deleteConversation(id: number) {
    const response = await apiRequest("DELETE", `/api/conversations/${id}`);
    return response.json();
  }
}
