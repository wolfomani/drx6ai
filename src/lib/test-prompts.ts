export const TEST_PROMPTS: Record<string, any> = {
  USER_SKY: {
    MESSAGE: {
      id: "test-1",
      role: "user",
      content: "لماذا السماء زرقاء؟",
      timestamp: new Date().toISOString(),
    },
    OUTPUT_STREAM: [
      'data: {"type":"start-step"}',
      'data: {"type":"text-start","id":"STATIC_ID"}',
      'data: {"type":"text-delta","id":"STATIC_ID","delta":"السماء "}',
      'data: {"type":"text-delta","id":"STATIC_ID","delta":"زرقاء "}',
      'data: {"type":"text-delta","id":"STATIC_ID","delta":"بسبب "}',
      'data: {"type":"text-delta","id":"STATIC_ID","delta":"تشتت الضوء"}',
      'data: {"type":"text-end","id":"STATIC_ID"}',
      'data: {"type":"finish-step"}',
      'data: {"type":"finish"}',
      "data: [DONE]",
    ],
  },
  USER_GRASS: {
    MESSAGE: {
      id: "test-2",
      role: "user",
      content: "لماذا العشب أخضر؟",
      timestamp: new Date().toISOString(),
    },
    OUTPUT_STREAM: [
      'data: {"type":"start-step"}',
      'data: {"type":"text-start","id":"STATIC_ID"}',
      'data: {"type":"text-delta","id":"STATIC_ID","delta":"العشب "}',
      'data: {"type":"text-delta","id":"STATIC_ID","delta":"أخضر "}',
      'data: {"type":"text-delta","id":"STATIC_ID","delta":"بسبب "}',
      'data: {"type":"text-delta","id":"STATIC_ID","delta":"الكلوروفيل"}',
      'data: {"type":"text-end","id":"STATIC_ID"}',
      'data: {"type":"finish-step"}',
      'data: {"type":"finish"}',
      "data: [DONE]",
    ],
  },
  USER_THANKS: {
    MESSAGE: {
      id: "test-3",
      role: "user",
      content: "شكراً لك!",
      timestamp: new Date().toISOString(),
    },
  },
  USER_NEXTJS: {
    MESSAGE: {
      id: "test-4",
      role: "user",
      content: "ما هي مزايا استخدام Next.js؟",
      timestamp: new Date().toISOString(),
    },
  },
  USER_TEXT_ARTIFACT: {
    MESSAGE: {
      id: "test-5",
      role: "user",
      content: "ساعدني في كتابة مقال عن الذكاء الاصطناعي",
      timestamp: new Date().toISOString(),
    },
  },
}
