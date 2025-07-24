"use client";

interface AIProvider {
  getName(): string;
  isAvailable(): boolean;
  generateResponse(message: string): Promise<string>;
}

class DeepSeekProvider implements AIProvider {
  getName(): string {
    return "DeepSeek R1";
  }

  isAvailable(): boolean {
    return true;
  }

  async generateResponse(message: string): Promise<string> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    
    return `مرحباً! أنا DeepSeek R1، نموذج التفكير المتقدم. 

بعد تحليل رسالتك: "${message}"

يمكنني أن أقدم لك إجابة شاملة ومدروسة. أستخدم تقنيات التفكير المتقدم لفهم السياق وتقديم أفضل الحلول.

هل تريد مني التوسع في أي جانب معين من إجابتي؟`;
  }
}

class GeminiProvider implements AIProvider {
  getName(): string {
    return "Gemini Pro";
  }

  isAvailable(): boolean {
    return true;
  }

  async generateResponse(message: string): Promise<string> {
    // Simulate faster response
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    return `أهلاً وسهلاً! أنا Gemini Pro من Google.

استفسارك: "${message}"

أقدم لك إجابة سريعة ودقيقة باستخدام أحدث تقنيات الذكاء الاصطناعي. يمكنني مساعدتك في مختلف المجالات من الكتابة إلى التحليل والبرمجة.

كيف يمكنني مساعدتك أكثر؟`;
  }
}

class GroqProvider implements AIProvider {
  getName(): string {
    return "Groq Lightning";
  }

  isAvailable(): boolean {
    return true;
  }

  async generateResponse(message: string): Promise<string> {
    // Simulate very fast response
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    return `⚡ استجابة فائقة السرعة من Groq!

رسالتك: "${message}"

أنا متخصص في الاستجابات السريعة والفعالة. بفضل معالجة الأجهزة المتقدمة، يمكنني تقديم إجابات عالية الجودة في وقت قياسي.

هل تحتاج لمزيد من المعلومات؟`;
  }
}

class TogetherProvider implements AIProvider {
  getName(): string {
    return "Together AI";
  }

  isAvailable(): boolean {
    return true;
  }

  async generateResponse(message: string): Promise<string> {
    // Simulate moderate response time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2500));
    
    return `🤝 مرحباً من Together AI!

سؤالك: "${message}"

أستخدم نماذج مفتوحة المصدر لتقديم إجابات مفيدة ومجانية. أؤمن بالذكاء الاصطناعي المتاح للجميع والمدعوم من المجتمع.

كيف يمكنني خدمتك بشكل أفضل؟`;
  }
}

export class AIProviderFactory {
  private static providers: Map<string, AIProvider> = new Map([
    ['deepseek', new DeepSeekProvider()],
    ['gemini', new GeminiProvider()],
    ['groq', new GroqProvider()],
    ['together', new TogetherProvider()],
  ]);

  static getProvider(modelId: string): AIProvider | null {
    return this.providers.get(modelId) || null;
  }

  static getAllProviders(): Map<string, AIProvider> {
    return this.providers;
  }
}
