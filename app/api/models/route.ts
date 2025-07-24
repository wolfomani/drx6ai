import { NextResponse } from "next/server";

const models = [
  {
    id: "deepseek",
    name: "DeepSeek R1",
    description: "نموذج التفكير المتقدم",
    icon: "DS",
    color: "blue",
    isAvailable: true,
    features: ["reasoning", "thinking", "analysis"]
  },
  {
    id: "gemini",
    name: "Gemini Pro",
    description: "نموذج Google المتطور",
    icon: "GM",
    color: "purple",
    isAvailable: true,
    features: ["fast", "multimodal", "creative"]
  },
  {
    id: "groq",
    name: "Groq Lightning",
    description: "الاستجابة الفائقة السرعة",
    icon: "GQ",
    color: "orange",
    isAvailable: true,
    features: ["speed", "efficiency", "performance"]
  },
  {
    id: "together",
    name: "Together AI",
    description: "نماذج مفتوحة المصدر",
    icon: "TG",
    color: "green",
    isAvailable: true,
    features: ["opensource", "free", "community"]
  }
];

export async function GET() {
  try {
    return NextResponse.json(models);
  } catch (error) {
    console.error('Get models error:', error);
    return NextResponse.json(
      { message: "فشل في جلب النماذج" },
      { status: 500 }
    );
  }
}
