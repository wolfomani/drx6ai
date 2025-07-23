import { GoogleGenAI } from "@google/genai";

// AI Provider interfaces
export interface AIProvider {
  generateResponse(prompt: string, options?: any): Promise<string>;
  getName(): string;
  isAvailable(): boolean;
}

// Gemini Provider
export class GeminiProvider implements AIProvider {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY || "";
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateResponse(prompt: string, options: any = {}): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.0-flash-thinking-exp",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `أجب باللغة العربية. ${prompt}`
              }
            ]
          }
        ],
        generationConfig: {
          thinkingConfig: {
            thinkingBudget: -1,
          },
          responseMimeType: "text/plain",
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE"
          }
        ]
      });

      return response.text || "عذراً، لم أتمكن من إنتاج إجابة.";
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error(`Gemini API error: ${error}`);
    }
  }

  getName(): string {
    return "Gemini";
  }

  isAvailable(): boolean {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
    console.log('Gemini API Key check:', apiKey ? 'Available' : 'Missing');
    return !!apiKey;
  }
}

// DeepSeek Provider with reasoning capabilities
export class DeepSeekProvider implements AIProvider {
  async generateResponse(prompt: string, options: any = {}): Promise<string> {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error("DeepSeek API key not configured");
    }

    try {
      const response = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "system", 
              content: "أنت مساعد ذكي ومفيد. فكر خطوة بخطوة وأظهر عملية التفكير عند الحاجة. أجب باللغة العربية."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          stream: false,
          temperature: 0.7,
          max_tokens: 2048,
        }),
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "عذراً، لم أتمكن من إنتاج إجابة.";
    } catch (error) {
      console.error('DeepSeek API Error:', error);
      throw new Error(`DeepSeek API error: ${error}`);
    }
  }

  getName(): string {
    return "DeepSeek";
  }

  isAvailable(): boolean {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    console.log('DeepSeek API Key check:', apiKey ? 'Available' : 'Missing');
    return !!apiKey;
  }
}

export class GroqProvider implements AIProvider {
  async generateResponse(prompt: string, options: any = {}): Promise<string> {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("Groq API key not configured");
    }

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "qwen/qwen3-32b",
          messages: [
            {
              role: "system",
              content: "أنت مساعد ذكي وسريع. قدم إجابات دقيقة وسريعة باللغة العربية."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.6,
          max_completion_tokens: 4096,
          top_p: 0.95,
          reasoning_effort: "default",
        }),
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "عذراً، لم أتمكن من إنتاج إجابة.";
    } catch (error) {
      console.error('Groq API Error:', error);
      throw new Error(`Groq API error: ${error}`);
    }
  }

  getName(): string {
    return "Groq";
  }

  isAvailable(): boolean {
    const apiKey = process.env.GROQ_API_KEY;
    console.log('Groq API Key check:', apiKey ? 'Available' : 'Missing');
    return !!apiKey;
  }
}

export class TogetherProvider implements AIProvider {
  async generateResponse(prompt: string, options: any = {}): Promise<string> {
    const apiKey = process.env.TOGETHER_API_KEY;
    if (!apiKey) {
      throw new Error("Together API key not configured");
    }

    try {
      const response = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
          messages: [
            {
              role: "system",
              content: "أنت مساعد ذكي مدعوم بنماذج مفتوحة المصدر. قدم إجابات مدروسة ومفصلة باللغة العربية."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2048,
        }),
      });

      if (!response.ok) {
        throw new Error(`Together API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "عذراً، لم أتمكن من إنتاج إجابة.";
    } catch (error) {
      console.error('Together API Error:', error);
      throw new Error(`Together API error: ${error}`);
    }
  }

  getName(): string {
    return "Together";
  }

  isAvailable(): boolean {
    const apiKey = process.env.TOGETHER_API_KEY;
    console.log('Together API Key check:', apiKey ? 'Available' : 'Missing');
    return !!apiKey;
  }
}

// Provider factory
export class AIProviderFactory {
  private static providers: Map<string, AIProvider> = new Map([
    ['gemini', new GeminiProvider()],
    ['deepseek', new DeepSeekProvider()],
    ['groq', new GroqProvider()],
    ['together', new TogetherProvider()],
  ]);

  static getProvider(modelId: string): AIProvider | undefined {
    return this.providers.get(modelId);
  }

  static getAllProviders(): Map<string, AIProvider> {
    return this.providers;
  }

  static isProviderAvailable(modelId: string): boolean {
    const provider = this.getProvider(modelId);
    return provider ? provider.isAvailable() : false;
  }
}
