"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, ExternalLink, Github, Home, Calendar, Users, Star } from "lucide-react"

export default function PortfolioPage({ onNavigate }) {
  const projects = [
    {
      title: "منصة الذكاء الاصطناعي العُمانية",
      description: "منصة شاملة للذكاء الاصطناعي تدعم نماذج متعددة مع واجهة دردشة تفاعلية ولوحة تحليلات متقدمة",
      image: "/placeholder.svg",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "AI SDK", "PostgreSQL"],
      category: "ذكاء اصطناعي",
      date: "2025",
      client: "مشروع شخصي",
      status: "مكتمل",
      features: ["دردشة ذكية", "نماذج AI متعددة", "لوحة تحليلات", "تصميم متجاوب"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "نظام إدارة المحادثات الذكية",
      description: "نظام متقدم لإدارة المحادثات مع الذكاء الاصطناعي يدعم حفظ المحادثات والبحث المتقدم",
      image: "/placeholder.svg",
      technologies: ["Next.js", "Node.js", "Redis", "PostgreSQL", "Groq API"],
      category: "تطبيق ويب",
      date: "2024",
      client: "شركة تقنية",
      status: "مكتمل",
      features: ["حفظ المحادثات", "بحث متقدم", "تصدير البيانات", "إحصائيات مفصلة"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "تطبيق الدردشة الذكية للجوال",
      description: "تطبيق جوال متعدد المنصات للدردشة مع الذكاء الاصطناعي بواجهة سهلة الاستخدام",
      image: "/placeholder.svg",
      technologies: ["React Native", "TypeScript", "Firebase", "AI SDK"],
      category: "تطبيق جوال",
      date: "2024",
      client: "شركة ناشئة",
      status: "قيد التطوير",
      features: ["دردشة فورية", "إشعارات ذكية", "وضع أوفلاين", "مشاركة الملفات"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "لوحة تحكم التحليلات المتقدمة",
      description: "لوحة تحكم شاملة لعرض إحصائيات وتحليلات استخدام أنظمة الذكاء الاصطناعي",
      image: "/placeholder.svg",
      technologies: ["React", "D3.js", "Chart.js", "Python", "FastAPI"],
      category: "تحليلات",
      date: "2024",
      client: "مؤسسة حكومية",
      status: "مكتمل",
      features: ["رسوم بيانية تفاعلية", "تقارير مخصصة", "تصدير البيانات", "تحديث فوري"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "نظام إدارة المحتوى الذكي",
      description: "نظام إدارة محتوى مدعوم بالذكاء الاصطناعي لإنشاء وتحرير المحتوى تلقائياً",
      image: "/placeholder.svg",
      technologies: ["Vue.js", "Laravel", "MySQL", "OpenAI API"],
      category: "نظام إدارة",
      date: "2023",
      client: "شركة إعلامية",
      status: "مكتمل",
      features: ["إنشاء محتوى تلقائي", "تحرير ذكي", "جدولة النشر", "تحليل الأداء"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "منصة التعلم الآلي التفاعلية",
      description: "منصة تعليمية تفاعلية لتعلم أساسيات الذكاء الاصطناعي والتعلم الآلي",
      image: "/placeholder.svg",
      technologies: ["Python", "Jupyter", "TensorFlow", "Streamlit"],
      category: "تعليم",
      date: "2023",
      client: "جامعة",
      status: "مكتمل",
      features: ["دروس تفاعلية", "تمارين عملية", "مشاريع تطبيقية", "شهادات"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ]

  const stats = [
    { label: "مشروع مكتمل", value: "25+", icon: <Star className="w-6 h-6" /> },
    { label: "عميل راضي", value: "50+", icon: <Users className="w-6 h-6" /> },
    { label: "سنوات خبرة", value: "5+", icon: <Calendar className="w-6 h-6" /> },
    { label: "تقنية متقنة", value: "20+", icon: <Brain className="w-6 h-6" /> },
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
              <span className="text-sm text-[#8b949e]">معرض الأعمال</span>
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
            معرض أعمالنا
          </h2>
          <p className="text-xl text-[#8b949e] mb-8 max-w-3xl mx-auto">
            استكشف مجموعة من مشاريعنا المتميزة في مجال الذكاء الاصطناعي وتطوير التطبيقات
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 bg-[#161b22]/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4 text-purple-400">{stat.icon}</div>
                <div className="text-3xl font-bold text-[#f0f6fc] mb-2">{stat.value}</div>
                <div className="text-[#8b949e]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-[#21262d] border-[#30363d] hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 overflow-hidden"
              >
                <div className="relative h-48 bg-gradient-to-br from-purple-600/20 to-blue-600/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="w-16 h-16 text-purple-400/50" />
                  </div>
                  <Badge className="absolute top-4 right-4 bg-purple-600 text-white">{project.category}</Badge>
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg text-[#f0f6fc]">{project.title}</CardTitle>
                    <Badge variant={project.status === "مكتمل" ? "default" : "secondary"}>{project.status}</Badge>
                  </div>
                  <CardDescription className="text-[#8b949e] text-sm">{project.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-[#f0f6fc] mb-2">المميزات الرئيسية:</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.features.slice(0, 3).map((feature, featureIndex) => (
                          <Badge key={featureIndex} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-[#f0f6fc] mb-2">التقنيات المستخدمة:</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="text-sm text-[#8b949e]">
                        <div>{project.date}</div>
                        <div>{project.client}</div>
                      </div>
                      <div className="flex space-x-2 space-x-reverse">
                        <Button size="sm" variant="outline" className="p-2 bg-transparent">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="p-2 bg-transparent">
                          <Github className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
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
          <h3 className="text-3xl font-bold mb-6 text-[#f0f6fc]">هل لديك مشروع في ذهنك؟</h3>
          <p className="text-xl text-[#8b949e] mb-8">دعنا نساعدك في تحويل فكرتك إلى واقع رقمي مبتكر</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => onNavigate("contact")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
            >
              ابدأ مشروعك الآن
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate("services")}
              className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-3"
            >
              استكشف خدماتنا
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
