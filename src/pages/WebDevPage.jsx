"use client"

import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Brain, ArrowRight, Home, Code, Palette, Zap, Shield, Search, Smartphone } from "lucide-react"

export default function WebDevPage() {
  const navigate = useNavigate()

  const technologies = [
    { name: "React", icon: "⚛️", description: "مكتبة JavaScript لبناء واجهات المستخدم" },
    { name: "Next.js", icon: "▲", description: "إطار عمل React للتطبيقات الإنتاجية" },
    { name: "TypeScript", icon: "📘", description: "JavaScript مع أنواع البيانات الثابتة" },
    { name: "Tailwind CSS", icon: "🎨", description: "إطار عمل CSS للتصميم السريع" },
    { name: "Node.js", icon: "🟢", description: "بيئة تشغيل JavaScript للخادم" },
    { name: "PostgreSQL", icon: "🐘", description: "قاعدة بيانات علائقية متقدمة" }
  ]

  const features = [
    {
      icon: <Code className="w-8 h-8 text-blue-400" />,
      title: "تطوير مخصص",
      description: "نطور مواقع ويب مخصصة تماماً لاحتياجاتك الفريدة",
      details: ["كود نظيف ومنظم", "أفضل الممارسات", "قابلية الصيانة", "توثيق شامل"]
    },
    {
      icon: <Palette className="w-8 h-8 text-purple-400" />,
      title: "تصميم متجاوب",
      description: "تصميمات تعمل بسلاسة على جميع الأجهزة والشاشات",
      details: ["تصميم موبايل أولاً", "تجربة مستخدم متسقة", "تحسين الأداء", "اختبار متعدد الأجهزة"]
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "أداء عالي",
      description: "مواقع سريعة ومحسنة لأفضل تجربة مستخدم",
      details: ["تحسين السرعة", "ضغط الصور", "تحميل تدريجي", "CDN متقدم"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-400" />,
      title: "أمان متقدم",
      description: "حماية شاملة ضد التهديدات الأمنية المختلفة",
      details: ["تشفير SSL", "حماية من الهجمات", "نسخ احتياطية", "مراقبة أمنية"]
    },
    {
      icon: <Search className="w-8 h-8 text-red-400" />,
      title: "تحسين SEO",
      description: "تحسين محركات البحث لزيادة الظهور والوصول",
      details: ["كلمات مفتاحية", "محتوى محسن", "روابط داخلية", "سرعة التحميل"]
    },
    {
      icon: <Smartphone className="w-8 h-8 text-indigo-400" />,
      title: "تطبيقات ويب تقدمية",
      description: "PWA تعمل مثل التطبيقات الأصلية",
      details: ["عمل أوفلاين", "إشعارات فورية", "تثبيت على الجهاز", "تحديثات تلقائية"]
    }
  ]

  const packages = [
    {
      name: "الباقة الأساسية",
      price: "3,000 ريال",
      duration: "2-3 أسابيع",
      features: [
        "موقع من 5 صفحات",
        "تصميم متجاوب",
        "نموذج اتصال",
        "تحسين SEO أساسي",
        "استضافة لسنة واحدة",
        "دعم فني لشهرين"
      ],
      popular: false
    },
    {
      name: "الباقة المتقدمة",
      price: "6,000 ريال",
      duration: "4-6 أسابيع",
      features: [
        "موقع من 10 صفحات",
        "لوحة إدارة محتوى",
        "تكامل قاعدة البيانات",
        "تحسين SEO متقدم",
        "تحليلات مفصلة",
        "استضافة لسنتين",
        "دعم فني لـ 6 أشهر"
      ],
      popular: true
    },
    {
      name: "الباقة الاحترافية",
      price: "12,000 ريال",
      duration: "8-12 أسبوع",
      features: [
        "موقع غير محدود الصفحات",
        "تطبيق ويب تفاعلي",
        "تكامل API متقدم",
        "نظام إدارة مستخدمين",
        "تحليلات وتقارير",
        "استضافة لـ 3 سنوات",
        "دعم فني لسنة كاملة"
      ],
      popular: false
    }
  ]

  const process = [
    {
      step: "01",
      title: "التخطيط والتحليل",
      description: "نحلل متطلباتك ونضع خطة مفصلة للمشروع"
    },
    {
      step: "02",
      title: "التصميم والنماذج",
      description: "نصمم واجهات المستخدم ونماذج أولية تفاعلية"
    },
    {
      step: "03",
      title: "التطوير والبرمجة",
      description: "نطور الموقع باستخدام أحدث التقنيات والمعايير"
    },
    {
      step: "04",
      title: "الاختبار والمراجعة",
      description: "نختبر جميع الوظائف ونراجع الجودة بعناية"
    },
    {
      step: "05",
      title: "النشر والتسليم",
      description: "ننشر الموقع ونقدم التدريب والدعم اللازم"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#21262d] text-[#f0f6fc] font-arabic" dir="rtl">
      {/* Header */}
      <header className="bg-[#161b22]/80 backdrop-blur-sm border-b border-[#30363d] px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-800 via-purple-700 to-pink-600 p-0.5">
              <div className="w-full h-full bg-[#21262d] rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 via-purple-700 to-pink-600 bg-clip-text text-transparent">
                DRX AI
              </h1>
              <span className="text-sm text-[#8b949e]">تطوير الويب</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 space-x-reverse">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/services")}
              className="hover:bg-[#30363d]"
            >
              الخدمات
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")}
              className="hover:bg-[#30363d]"
            >
              <Home className="w-4 h-4 ml-2" />
              الرئيسية
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            تطوير الويب الاحترافي
          </h2>
          <p className="text-xl text-[#8b949e] mb-8 max-w-3xl mx-auto">
            نطور مواقع ويب حديثة وتطبيقات ويب تفاعلية باستخدام أحدث التقنيات والمعايير العالمية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
              ابدأ مشروعك الآن
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate("/portfolio")}
              className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-3"
            >
              شاهد أعمالنا
            </Button>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 px-6 bg-[#161b22]/50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-[#f0f6fc]">
            التقنيات التي نستخدمها
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <Card key={index} className="bg-[#21262d] border-[#30363d] hover:border-purple-500/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <span className="text-2xl">{tech.icon}</span>
                    <CardTitle className="text-lg">{tech.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[#8b949e] text-sm">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-[#f0f6fc]">
            ميزات خدماتنا
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-[#21262d] border-[#30363d] hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <CardHeader>
                  <div className="flex items-center space-x-3 space-x-reverse mb-4">
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-[#8b949e]">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center space-x-2 space-x-reverse text-sm text-[#8b949e]">
                        <ArrowRight className="w-4 h-4 text-purple-400" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 px-6 bg-[#161b22]/50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-[#f0f6fc]">
            باقات تطوير الويب
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`bg-[#21262d] border-[#30363d] hover:border-purple-500/50 transition-all duration-300 relative ${pkg.popular ? 'ring-2 ring-purple-500' : ''}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white">
                    الأكثر شعبية
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-purple-400 mb-2">{pkg.price}</div>
                  <CardDescription className="text-[#8b949e]">مدة التنفيذ: {pkg.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 space-x-reverse text-sm">
                        <ArrowRight className="w-4 h-4 text-green-400" />
                        <span className="text-[#8b949e]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${pkg.popular ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : 'bg-[#30363d] hover:bg-[#40464d]'}`}>
                    اختر هذه الباقة
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-[#f0f6fc]">
            عملية التطوير
          </h3>
          <div className="space-y-8">
            {process.map((step, index) => (
              <div key={index} className="flex items-start space-x-6 space-x-reverse">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {step.step}
                </div>
                <Card className="flex-1 bg-[#21262d] border-[#30363d] hover:border-purple-500/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#8b949e]">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-[#161b22]/50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6 text-[#f0f6fc]">
            مستعد لبناء موقعك الإلكتروني؟
          </h3>
          <p className="text-xl text-[#8b949e] mb-8">
            دعنا نساعدك في إنشاء موقع ويب احترافي يعكس هويتك ويحقق أهدافك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/contact")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
            >
              احصل على استشارة مجانية
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate("/portfolio")}
              className="border-purple-500 text-purple-400 hover:bg-purple\
