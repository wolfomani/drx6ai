# Dr.X AI Chat - المساعد الذكي

تطبيق محادثة ذكية متقدم يدعم عدة نماذج ذكاء اصطناعي مع عرض التفكير الداخلي.

## ✨ الميزات

### 🤖 نماذج ذكاء اصطناعي متعددة
- **DeepSeek R1**: نموذج التفكير المتقدم
- **Gemini Pro**: نموذج Google السريع
- **Groq Lightning**: الاستجابة الفائقة السرعة
- **Together AI**: نماذج مفتوحة المصدر

### 🧠 عرض التفكير الداخلي
- مراقبة مراحل التفكير (تحليل، معالجة، إنتاج)
- عرض خطوات التفكير التفصيلية
- مؤشرات الثقة والتقدم

### 💬 واجهة محادثة متطورة
- دعم كامل للعربية (RTL)
- تصميم داكن عصري
- شريط جانبي للمحادثات
- رقائق الاقتراحات التفاعلية

### 🎤 ميزات الإدخال المتقدمة
- تسجيل صوتي
- رفع الملفات
- عداد الأحرف الذكي
- اختصارات المفاتيح

### 📊 إدارة المحادثات
- حفظ تلقائي
- تنظيم حسب التاريخ
- حذف وإدارة المحادثات

## 🚀 التشغيل

### المتطلبات
- Node.js 18+
- npm أو yarn

### التثبيت

1. **استنساخ المشروع**
\`\`\`bash
git clone https://github.com/your-username/drx-ai-chat.git
cd drx-ai-chat
\`\`\`

2. **تثبيت التبعيات**
\`\`\`bash
npm install
\`\`\`

3. **إعداد متغيرات البيئة**
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. **تشغيل التطبيق**
\`\`\`bash
npm run dev
\`\`\`

5. **فتح المتصفح**
\`\`\`
http://localhost:3000
\`\`\`

## 🛠️ التقنيات المستخدمة

- **Next.js 14** - إطار العمل الأساسي
- **TypeScript** - للأمان والتطوير
- **Tailwind CSS** - للتصميم
- **Radix UI** - مكونات الواجهة
- **TanStack Query** - إدارة البيانات
- **Lucide React** - الأيقونات

## 📁 هيكل المشروع

\`\`\`
drx-ai-chat/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── chat/              # صفحات المحادثة
│   ├── globals.css        # الأنماط العامة
│   ├── layout.tsx         # التخطيط الأساسي
│   └── page.tsx           # الصفحة الرئيسية
├── components/            # المكونات
│   ├── chat/             # مكونات المحادثة
│   └── ui/               # مكونات الواجهة
├── hooks/                # React Hooks
├── lib/                  # المكتبات والأدوات
└── public/               # الملفات العامة
\`\`\`

## 🔧 التخصيص

### إضافة نموذج AI جديد

1. **إنشاء Provider جديد في `lib/ai-providers.ts`**
\`\`\`typescript
class NewAIProvider implements AIProvider {
  getName(): string {
    return "New AI Model";
  }

  isAvailable(): boolean {
    return true;
  }

  async generateResponse(message: string): Promise<string> {
    // تنفيذ الاستجابة
    return "Response from new AI";
  }
}
\`\`\`

2. **إضافة النموذج إلى Factory**
\`\`\`typescript
static providers: Map<string, AIProvider> = new Map([
  // النماذج الموجودة...
  ['newai', new NewAIProvider()],
]);
\`\`\`

3. **تحديث API endpoint `/api/models`**

### تخصيص التصميم

- تعديل الألوان في `tailwind.config.js`
- تخصيص الأنماط في `app/globals.css`
- تعديل مكونات الواجهة في `components/ui/`

## 🤝 المساهمة

نرحب بالمساهمات! يرجى:

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 🆘 الدعم

إذا واجهت أي مشاكل أو لديك أسئلة:

- فتح [Issue](https://github.com/your-username/drx-ai-chat/issues)
- التواصل عبر البريد الإلكتروني: support@drx-ai.com

## 🙏 شكر وتقدير

- [Next.js](https://nextjs.org/) - إطار العمل الرائع
- [Tailwind CSS](https://tailwindcss.com/) - للتصميم السريع
- [Radix UI](https://www.radix-ui.com/) - مكونات الواجهة
- [Lucide](https://lucide.dev/) - الأيقونات الجميلة

---

صُنع بـ ❤️ من فريق Dr.X AI
\`\`\`

تم إعادة إنشاء تطبيق Dr.X AI Chat بالكامل من الصفر! 🎉

## الميزات المكتملة:

✅ **واجهة محادثة ذكية** مع دعم كامل للعربية  
✅ **4 نماذج AI** مختلفة (DeepSeek, Gemini, Groq, Together)  
✅ **عرض التفكير الداخلي** مع مراحل التحليل  
✅ **شريط جانبي** لإدارة المحادثات  
✅ **إدخال متقدم** مع تسجيل صوتي ورفع ملفات  
✅ **تصميم داكن عصري** مع انيميشنز سلسة  
✅ **API كامل** لإدارة المحادثات والرسائل  
✅ **تخزين في الذاكرة** قابل للتطوير لقاعدة بيانات حقيقية  

التطبيق جاهز للتشغيل والاستخدام! 🚀
