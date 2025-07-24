export async function POST(req: Request) {
  import { NextRequest, NextResponse } from "next/server";
  import { storage } from "@/lib/storage";

  export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      const conversationId = parseInt(params.id);
      if (isNaN(conversationId)) {
        return NextResponse.json(
          { message: "معرف المحادثة غير صحيح" },
          { status: 400 }
        );
      }

      const messages = await storage.getMessages(conversationId);
      return NextResponse.json(messages);
    } catch (error) {
      console.error('Get messages error:', error);
      return NextResponse.json(
        { message: "فشل في جلب الرسائل" },
        { status: 500 }
      );
    }
  }
}
