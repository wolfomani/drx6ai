"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Home, TrendingUp, Users, MessageSquare, Clock, Activity, Database, Zap } from "lucide-react"

export default function AnalyticsPage({ onNavigate }) {
  const [stats, setStats] = useState({
    totalConversations: 1250,
    activeUsers: 89,
    totalMessages: 15420,
    averageResponseTime: 1.2,
    systemUptime: 99.8,
    modelsUsed: 5,
    dataProcessed: 2.4,
    successRate: 98.5,
  })

  const [chartData, setChartData] = useState([
    { name: "يناير", conversations: 120, users: 45 },
    { name: "فبراير", conversations: 180, users: 62 },
    { name: "مارس", conversations: 240, users: 78 },
    { name: "أبريل", conversations: 320, users: 89 },
    { name: "مايو", conversations: 290, users: 85 },
  ])

  const modelStats = [
    { name: "Groq Llama 3.3", usage: 45, performance: 98.2, color: "bg-blue-500" },
    { name: "DeepSeek R1", usage: 30, performance: 97.8, color: "bg-purple-500" },
    { name: "Google Gemini", usage: 15, performance: 96.5, color: "bg-green-500" },
    { name: "OpenAI GPT-4", usage: 8, performance: 99.1, color: "bg-yellow-500" },
    { name: "Mistral AI", usage: 2, performance: 95.3, color: "bg-red-500" },
  ]

  const recentActivity = [
    { time: "10:30", action: "محادثة جديدة بدأت", user: "مستخدم #1234", model: "Groq Llama 3.3" },
    { time: "10:28", action: "تم إكمال تحليل البيانات", user: "النظام", model: "DeepSeek R1" },
    { time: "10:25", action: "مستخدم جديد انضم", user: "مستخدم #1235", model: "-" },
    { time: "10:22", action: "تم تحديث النموذج", user: "المدير", model: "Google Gemini" },
    { time: "10:20", action: "محادثة مكتملة", user: "مستخدم #1233", model: "Groq Llama 3.3" },
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
              <span className="text-sm text-[#8b949e]">لوحة التحليلات</span>
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={() => onNavigate("home")} className="hover:bg-[#30363d]">
            <Home className="w-4 h-4 ml-2" />
            العودة للرئيسية
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            لوحة التحليلات المتقدمة
          </h2>
          <p className="text-lg text-[#8b949e] mb-8">مراقبة شاملة لأداء النظام وإحصائيات الاستخدام في الوقت الفعلي</p>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="bg-[#21262d] border-[#30363d] hover:border-blue-500/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <MessageSquare className="w-8 h-8 text-blue-400" />
                  <span className="text-2xl font-bold text-blue-400">{stats.totalConversations.toLocaleString()}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#8b949e]">إجمالي المحادثات</p>
                <p className="text-xs text-green-400 mt-1">+12% من الشهر الماضي</p>
              </CardContent>
            </Card>

            <Card className="bg-[#21262d] border-[#30363d] hover:border-purple-500/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Users className="w-8 h-8 text-purple-400" />
                  <span className="text-2xl font-bold text-purple-400">{stats.activeUsers}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#8b949e]">المستخدمون النشطون</p>
                <p className="text-xs text-green-400 mt-1">+8% من الأسبوع الماضي</p>
              </CardContent>
            </Card>

            <Card className="bg-[#21262d] border-[#30363d] hover:border-green-500/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Clock className="w-8 h-8 text-green-400" />
                  <span className="text-2xl font-bold text-green-400">{stats.averageResponseTime}s</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#8b949e]">متوسط وقت الاستجابة</p>
                <p className="text-xs text-green-400 mt-1">-0.3s تحسن</p>
              </CardContent>
            </Card>

            <Card className="bg-[#21262d] border-[#30363d] hover:border-yellow-500/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Activity className="w-8 h-8 text-yellow-400" />
                  <span className="text-2xl font-bold text-yellow-400">{stats.systemUptime}%</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#8b949e]">وقت تشغيل النظام</p>
                <p className="text-xs text-green-400 mt-1">ممتاز</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Charts and Analytics */}
      <section className="px-6 mb-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Usage Chart */}
          <Card className="bg-[#21262d] border-[#30363d]">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span>إحصائيات الاستخدام الشهرية</span>
              </CardTitle>
              <CardDescription>المحادثات والمستخدمين النشطين</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2 space-x-reverse">
                {chartData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div className="flex space-x-1 space-x-reverse">
                      <div
                        className="w-6 bg-blue-500 rounded-t"
                        style={{ height: `${(data.conversations / 320) * 200}px` }}
                      ></div>
                      <div
                        className="w-6 bg-purple-500 rounded-t"
                        style={{ height: `${(data.users / 89) * 200}px` }}
                      ></div>
                    </div>
                    <span className="text-xs text-[#8b949e] transform -rotate-45">{data.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center space-x-4 space-x-reverse mt-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-sm text-[#8b949e]">المحادثات</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-3 h-3 bg-purple-500 rounded"></div>
                  <span className="text-sm text-[#8b949e]">المستخدمون</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Model Performance */}
          <Card className="bg-[#21262d] border-[#30363d]">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <Brain className="w-5 h-5 text-purple-400" />
                <span>أداء النماذج</span>
              </CardTitle>
              <CardDescription>إحصائيات استخدام وأداء نماذج الذكاء الاصطناعي</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modelStats.map((model, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{model.name}</span>
                      <span className="text-sm text-[#8b949e]">{model.usage}%</span>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <div className="flex-1">
                        <div className="w-full bg-[#30363d] rounded-full h-2">
                          <div className={`h-2 rounded-full ${model.color}`} style={{ width: `${model.usage}%` }}></div>
                        </div>
                      </div>
                      <span className="text-xs text-green-400">{model.performance}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-[#21262d] border-[#30363d]">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <Activity className="w-5 h-5 text-green-400" />
                <span>النشاط الأخير</span>
              </CardTitle>
              <CardDescription>آخر الأنشطة في النظام</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#161b22] rounded-lg">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-[#8b949e]">
                          {activity.user} • {activity.model}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-[#8b949e]">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* System Health */}
      <section className="px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-[#21262d] border-[#30363d]">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse text-lg">
                  <Database className="w-5 h-5 text-blue-400" />
                  <span>قاعدة البيانات</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#8b949e]">الاتصال</span>
                    <span className="text-sm text-green-400">متصل</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#8b949e]">البيانات المعالجة</span>
                    <span className="text-sm text-[#f0f6fc]">{stats.dataProcessed} GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#8b949e]">معدل النجاح</span>
                    <span className="text-sm text-green-400">{stats.successRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#21262d] border-[#30363d]">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse text-lg">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span>الأداء</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#8b949e]">استخدام المعالج</span>
                    <span className="text-sm text-[#f0f6fc]">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#8b949e]">استخدام الذاكرة</span>
                    <span className="text-sm text-[#f0f6fc]">62%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#8b949e]">سرعة الشبكة</span>
                    <span className="text-sm text-green-400">ممتازة</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#21262d] border-[#30363d]">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse text-lg">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span>النماذج</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#8b949e]">النماذج النشطة</span>
                    <span className="text-sm text-[#f0f6fc]">{stats.modelsUsed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#8b949e]">الطلبات اليومية</span>
                    <span className="text-sm text-[#f0f6fc]">2,340</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#8b949e]">معدل النجاح</span>
                    <span className="text-sm text-green-400">97.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
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
