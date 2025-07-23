"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Brain, Home, Mail, MapPin, Send, MessageSquare, Github, Clock } from "lucide-react"

export default function ContactPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("idle")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // محاكاة إرسال النموذج
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })

      // إعادة تعيين حالة النجاح بعد 3 ثوان
      setTimeout(() => setSubmitStatus("idle"), 3000)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-blue-400" />,
      title: "البريد الإلكتروني",
      value: "openaziz00@gmail.com",
      description: "راسلنا في أي وقت",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-green-400" />,
      title: "تليجرام",
      value: "@wolfaiOM",
      description: "للتواصل السريع",
    },
    {
      icon: <Github className="w-6 h-6 text-purple-400" />,
      title: "GitHub",
      value: "@abdulaziz-x7r1g",
      description: "تابع مشاريعنا",
    },
    {
      icon: <MapPin className="w-6 h-6 text-red-400" />,
      title: "الموقع",
      value: "سلطنة عُمان",
      description: "فخر عُماني",
    },
  ]

  const workingHours = [
    { day: "الأحد - الخميس", hours: "9:00 ص - 6:00 م" },
    { day: "الجمعة", hours: "2:00 م - 6:00 م" },
    { day: "السبت", hours: "مغلق" },
  ]

  const services = [
    "تطوير حلول الذكاء الاصطناعي",
    "تطوير مواقع الويب",
    "تطوير تطبيقات الجوال",
    "استشارات تقنية",
    "تدريب وورش عمل",
    "دعم فني",
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
              <span className="text-sm text-[#8b949e]">اتصل بنا</span>
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
            تواصل معنا
          </h2>
          <p className="text-xl text-[#8b949e] mb-8 max-w-3xl mx-auto">
            نحن هنا لمساعدتك في تحقيق أهدافك التقنية. تواصل معنا لمناقشة مشروعك القادم
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-[#21262d] border-[#30363d]">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center space-x-2 space-x-reverse">
                <Send className="w-6 h-6 text-blue-400" />
                <span>أرسل لنا رسالة</span>
              </CardTitle>
              <CardDescription>املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="أدخل اسمك الكامل"
                      required
                      className="bg-[#161b22] border-[#30363d] focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className="bg-[#161b22] border-[#30363d] focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">الموضوع</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="موضوع الرسالة"
                    required
                    className="bg-[#161b22] border-[#30363d] focus:border-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">الرسالة</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="اكتب رسالتك هنا..."
                    rows={6}
                    required
                    className="bg-[#161b22] border-[#30363d] focus:border-purple-500 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>جاري الإرسال...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Send className="w-4 h-4" />
                      <span>إرسال الرسالة</span>
                    </div>
                  )}
                </Button>

                {submitStatus === "success" && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-center">
                    تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="bg-[#21262d] border-[#30363d]">
              <CardHeader>
                <CardTitle className="text-xl">معلومات التواصل</CardTitle>
                <CardDescription>طرق مختلفة للتواصل معنا</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4 space-x-reverse">
                      <div className="flex-shrink-0">{info.icon}</div>
                      <div>
                        <h4 className="font-semibold text-[#f0f6fc]">{info.title}</h4>
                        <p className="text-[#8b949e] font-mono">{info.value}</p>
                        <p className="text-sm text-[#8b949e]">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Working Hours */}
            <Card className="bg-[#21262d] border-[#30363d]">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2 space-x-reverse">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>ساعات العمل</span>
                </CardTitle>
                <CardDescription>أوقات التواصل المباشر</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workingHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-[#8b949e]">{schedule.day}</span>
                      <span className="text-[#f0f6fc] font-mono">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card className="bg-[#21262d] border-[#30363d]">
              <CardHeader>
                <CardTitle className="text-xl">خدماتنا</CardTitle>
                <CardDescription>ما يمكننا مساعدتك فيه</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-2 space-x-reverse text-sm">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-[#8b949e]">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-[#161b22]/50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-[#f0f6fc]">الأسئلة الشائعة</h3>
          <div className="space-y-6">
            <Card className="bg-[#21262d] border-[#30363d]">
              <CardHeader>
                <CardTitle className="text-lg">كم يستغرق تطوير مشروع ذكاء اصطناعي؟</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#8b949e]">
                  يعتمد ذلك على تعقيد المشروع ومتطلباته. المشاريع البسيطة قد تستغرق 2-4 أسابيع، بينما المشاريع المعقدة
                  قد تحتاج 2-6 أشهر.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#21262d] border-[#30363d]">
              <CardHeader>
                <CardTitle className="text-lg">هل تقدمون دعم فني بعد التسليم؟</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#8b949e]">
                  نعم، نقدم دعم فني شامل لمدة 3 أشهر مجاناً بعد التسليم، مع إمكانية تمديد فترة الدعم حسب الحاجة.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#21262d] border-[#30363d]">
              <CardHeader>
                <CardTitle className="text-lg">ما هي التقنيات التي تستخدمونها؟</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#8b949e]">
                  نستخدم أحدث التقنيات مثل Python، TensorFlow، PyTorch، Next.js، React، وأحدث نماذج الذكاء الاصطناعي من
                  OpenAI، Google، وغيرها.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6 text-[#f0f6fc]">مستعد لبدء مشروعك؟</h3>
          <p className="text-xl text-[#8b949e] mb-8">دعنا نساعدك في تحويل فكرتك إلى واقع رقمي مبتكر</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
            >
              احجز استشارة مجانية
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
