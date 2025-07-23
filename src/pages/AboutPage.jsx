"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Home, Target, Users, Award, Globe, Heart, Code, Lightbulb, Rocket } from "lucide-react"

export default function AboutPage({ onNavigate }) {
  const values = [
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
      title: "الابتكار",
      description: "نسعى دائماً لتطوير حلول مبتكرة تواكب أحدث التطورات في مجال الذكاء الاصطناعي",
    },
    {
      icon: <Heart className="w-8 h-8 text-red-400" />,
      title: "الشغف",
      description: "نعمل بشغف وحب لما نقوم به، مما ينعكس على جودة منتجاتنا وخدماتنا",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      title: "التعاون",
      description: "نؤمن بقوة العمل الجماعي والتعاون مع عملائنا لتحقيق أفضل النتائج",
    },
    {
      icon: <Award className="w-8 h-8 text-purple-400" />,
      title: "الجودة",
      description: "نلتزم بأعلى معايير الجودة في جميع مراحل تطوير وتسليم مشاريعنا",
    },
  ]

  const team = [
    {
      name: "عبد العزيز",
      role: "مطور ذكاء اصطناعي رئيسي",
      description: "مطور شغوف بتكنولوجيا الذكاء الاصطناعي مع خبرة في تطوير الحلول المبتكرة",
      skills: ["Python", "Machine Learning", "Deep Learning", "NLP", "Computer Vision"],
      location: "سلطنة عُمان",
    },
  ]

  const milestones = [
    {
      year: "2020",
      title: "بداية الرحلة",
      description: "بدأت رحلتي في تعلم أساسيات الذكاء الاصطناعي والبرمجة",
    },
    {
      year: "2021",
      title: "أول مشروع",
      description: "تطوير أول تطبيق ذكي باستخدام تقنيات التعلم الآلي",
    },
    {
      year: "2022",
      title: "التوسع",
      description: "بدء العمل على مشاريع أكثر تعقيداً وتنوعاً في مجال الذكاء الاصطناعي",
    },
    {
      year: "2023",
      title: "النمو",
      description: "تطوير منصات متقدمة وتقديم خدمات احترافية للعملاء",
    },
    {
      year: "2024",
      title: "الابتكار",
      description: "إطلاق حلول مبتكرة تدمج أحدث تقنيات الذكاء الاصطناعي",
    },
    {
      year: "2025",
      title: "المنصة الموحدة",
      description: "إطلاق DRX AI كمنصة شاملة تجمع جميع الخدمات والحلول",
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
              <span className="text-sm text-[#8b949e]">من نحن</span>
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
            من نحن
          </h2>
          <p className="text-xl text-[#8b949e] mb-8 max-w-3xl mx-auto">
            نحن فريق من المطورين المتحمسين لتكنولوجيا الذكاء الاصطناعي، نسعى لتقديم حلول مبتكرة تساهم في تطوير المجتمع
            التقني
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 bg-[#161b22]/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="bg-[#21262d] border-[#30363d] hover:border-blue-500/50 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <Target className="w-8 h-8 text-blue-400" />
                  <CardTitle className="text-2xl">رؤيتنا</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#8b949e] text-lg leading-relaxed">
                  أن نكون الرواد في تطوير حلول الذكاء الاصطناعي في المنطقة العربية، ونساهم في بناء مستقبل تقني مشرق يخدم
                  المجتمع ويحسن من جودة الحياة للجميع.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#21262d] border-[#30363d] hover:border-purple-500/50 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <Rocket className="w-8 h-8 text-purple-400" />
                  <CardTitle className="text-2xl">مهمتنا</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#8b949e] text-lg leading-relaxed">
                  تطوير وتقديم حلول ذكية مبتكرة تستخدم أحدث تقنيات الذكاء الاصطناعي، مع التركيز على سهولة الاستخدام
                  والفعالية، لمساعدة الأفراد والمؤسسات على تحقيق أهدافهم.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-[#f0f6fc]">قيمنا الأساسية</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="bg-[#21262d] border-[#30363d] hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 text-center"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#8b949e] text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-6 bg-[#161b22]/50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-[#f0f6fc]">فريق العمل</h3>
          <div className="flex justify-center">
            {team.map((member, index) => (
              <Card
                key={index}
                className="bg-[#21262d] border-[#30363d] hover:border-purple-500/50 transition-all duration-300 max-w-md"
              >
                <CardHeader className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <Code className="w-12 h-12 text-white" />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-purple-400">{member.role}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-[#8b949e] mb-4 leading-relaxed">{member.description}</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {member.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-2 py-1 bg-[#30363d] text-xs rounded-full text-[#8b949e]">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-center space-x-2 space-x-reverse text-sm text-[#8b949e]">
                    <Globe className="w-4 h-4" />
                    <span>{member.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-[#f0f6fc]">رحلتنا عبر الزمن</h3>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-4 space-x-reverse">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {milestone.year}
                </div>
                <Card className="flex-1 bg-[#21262d] border-[#30363d] hover:border-purple-500/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">{milestone.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#8b949e]">{milestone.description}</p>
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
          <h3 className="text-3xl font-bold mb-6 text-[#f0f6fc]">انضم إلى رحلتنا</h3>
          <p className="text-xl text-[#8b949e] mb-8">نحن نؤمن بقوة التعاون والشراكة في بناء مستقبل أفضل</p>
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
