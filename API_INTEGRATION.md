# دليل ربط النماذج الحقيقية

## 1. إضافة متغيرات البيئة

أضف في ملف `.env`:
\`\`\`
DEEPSEEK_API_KEY=your_deepseek_key
GROQ_API_KEY=your_groq_key  
TOGETHER_API_KEY=your_together_key
GEMINI_API_KEY=your_gemini_key
\`\`\`

## 2. إنشاء API Route

أنشئ ملف `pages/api/chat.js` أو `app/api/chat/route.js`:

\`\`\`javascript
export async function POST(request) {
  const { message, model } = await request.json();
  
  let response;
  
  switch(model) {
    case 'deepseek':
      response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: message }],
        }),
      });
      break;
      
    case 'groq':
      response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
          messages: [{ role: 'user', content: message }],
        }),
      });
      break;
      
    // إضافة باقي النماذج...
  }
  
  const data = await response.json();
  return Response.json({ response: data.choices[0].message.content });
}
\`\`\`

## 3. تفعيل الاتصال

في `src/App.jsx`، قم بإلغاء التعليق عن كود الاتصال بـ API وحذف الرد المؤقت.
