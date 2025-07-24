import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function GET() {
  try {
    const conversations = await storage.getConversations();
    return NextResponse.json(conversations);
  } catch (error) {
    console.error('Get conversations error:', error);
    return NextResponse.json(
      { message: "فشل في جلب المحادثات" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, model } = body;
    
    if (!title || !model) {
      return NextResponse.json(
        { message: "العنوان والنموذج مطلوبان" },
        { status: 400 }
      );
    }

    const conversation = await storage.createConversation({
      title: title.slice(0, 100),
      model,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(conversation, { status: 201 });
  } catch (error) {
    console.error('Create conversation error:', error);
    return NextResponse.json(
      { message: "فشل في إنشاء المحادثة" },
      { status: 500 }
    );
  }
}
