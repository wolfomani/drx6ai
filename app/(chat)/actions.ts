"use server"

export async function deleteTrailingMessages({ id }: { id: string }) {
  // تنفيذ حذف الرسائل التالية
  console.log("حذف الرسائل التالية للرسالة:", id)
  return { success: true }
}
