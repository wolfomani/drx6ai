export async function POST(req: Request) {
  import { NextRequest, NextResponse } from "next/server";
  import { storage } from "@/lib/storage";

  export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      const id = parseInt(params.id);
      if (isNaN(id)) {
        return NextResponse.json(
          { message: "معرف المحادثة غير صحيح" },
          { status: 400 }
        );
      }

      const conversation = await storage.getConversation(id);
      if (!conversation) {
        return NextResponse.json(
          { message: "المحادثة غير موجودة" },
          { status: 404 }
        );
      }

      return NextResponse.json(conversation);
    } catch (error) {
      console.error('Get conversation error:', error);
      return NextResponse.json(
        { message: "فشل في جلب المحادثة" },
        { status: 500 }
      );
    }
  }

  export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      const id = parseInt(params.id);
      if (isNaN(id)) {
        return NextResponse.json(
          { message: "معرف المحادثة غير صحيح" },
          { status: 400 }
        );
      }

      const deleted = await storage.deleteConversation(id);
      if (!deleted) {
        return NextResponse.json(
          { message: "المحادثة غير موجودة" },
          { status: 404 }
        );
      }

      return NextResponse.json({ message: "تم حذف المحادثة بنجاح" });
    } catch (error) {
      console.error('Delete conversation error:', error);
      return NextResponse.json(
        { message: "فشل في حذف المحادثة" },
        { status: 500 }
      );
    }
  }
}
