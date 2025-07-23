"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Code, Smartphone, Database, Cloud, Zap, ArrowRight, Home } from "lucide-react"

export default function ServicesPage({ onNavigate }) {
  const services = [
    {
      icon: <Brain className="w-8 h-8 text-purple-400" />,
      title: "حلول الذكاء الاصطناعي",
      description: "تطوير نماذج ذكية مخصصة وتكامل أنظمة الذكاء الاصطناعي",
      features: ["نماذج تعلم آلي مخصصة", "معالجة اللغة الطبيعية", "رؤية حاسوبية", "تحليل البيانات الذكي"],
      price: "يبدأ من 5000 ريال",
    },
    {
      icon: <Code className="w-8 h-8 text-blue-400" />,
      title: "تطوير الويب",
      description: "مواقع ويب حديثة وتطبيقات ويب تفاعلية باستخدام أحدث التقنيات",
      features: ["React & Next.js", "تصميم متجاوب", "تحسين محركات البحث", "أمان متقدم"],
      price: "يبدأ من 3000 ريال",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-green-400" />,
      title: "تطبيقات الجوال",
      description: "تطبيقات جوال أصلية ومتعددة المنصات لنظامي iOS و Android",
      features: ["React Native", "Flutter", "تطبيقات أصلية", "تكامل API"],
      price: "يبدأ من 4000 ريال",
    },
    {
      icon: <Database className="w-8 h-8 text-yellow-400" />,
      title: "إدارة البيانات",
      description: "حلول قواعد البيانات وتحليل البيانات الضخمة",
      features: ["PostgreSQL", "MongoDB", "تحليل البيانات", "تصور البيانات"],
      price: "يبدأ من 2500 ريال",
    },
    {
      icon: <Cloud className="w-8 h-8 text-indigo-400" />,
      title: "الحوسبة السحابية",
      description: "نشر وإدارة التطبيقات على المنصات السحابية",
      features: ["AWS", "Vercel", "Docker", "Kubernetes"],
      price: "يبدأ من 2000 ريال",
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-400" />,
      title: "الأتمتة والتكامل",
      description: "أتمتة العمليات وتكامل الأنظمة المختلفة",
      features: ["API Integration", "Workflow Automation", "CI/CD", "Monitoring"],
      price: "يبدأ من 3500 ريال",
    },
  ]

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#21262d] text-[#f0f6fc] font-arabic"
      dir="rtl"
    >
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
              <span className="text-sm text-[#8b949e]">الخدمات</span>
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={() => onNavigate("home")} className="hover:bg-[#30363d]">
            <Home className="w-4 h-4 ml-2" />
            العودة للرئيسية
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            خدماتنا المتميزة
          </h2>
          <p className="text-xl text-[#8b949e] mb-8 max-w-3xl mx-auto">
            نقدم مجموعة شاملة من الخدمات التقنية المتطورة لتلبية احتياجات عملائنا
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-[#21262d] border-[#30363d] hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3 space-x-reverse mb-4">
                    {service.icon}
                    <CardTitle className="text-xl text-[#f0f6fc]">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-[#8b949e] text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-2 space-x-reverse text-sm text-[#8b949e]"
                      >
                        <ArrowRight className="w-4 h-4 text-purple-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-green-400">{service.price}</span>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      طلب الخدمة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-[#161b22]/50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6 text-[#f0f6fc]">هل تحتاج خدمة مخصصة؟</h3>
          <p className="text-xl text-[#8b949e] mb-8">نحن نقدم حلول مخصصة تماماً لاحتياجاتك الفريدة</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => onNavigate("contact")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
            >
              تواصل معنا
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate("portfolio")}
              className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-3"
            >
              شاهد أعمالنا
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d1117] border-t border-[#30363d] py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#8b949e]">© 2025 DRX AI. جميع الحقوق محفوظة | صُنع بـ ❤️ في سلطنة عُمان</p>
        </div>
      </footer>
    </div>
  )
}
