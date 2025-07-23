"use client"
import { motion } from "framer-motion"
import { SparklesIcon } from "./icons"

export function Greeting() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <div className="mb-8">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
          <SparklesIcon size={32} className="text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold mb-2">مرحباً بك في Dr.X</h1>
        <p className="text-xl text-muted-foreground">مساعدك الذكي للإجابة على جميع أسئلتك</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 border rounded-lg bg-card"
        >
          <h3 className="font-semibold mb-2">💡 إجابات ذكية</h3>
          <p className="text-sm text-muted-foreground">احصل على إجابات دقيقة ومفصلة لجميع أسئلتك</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 border rounded-lg bg-card"
        >
          <h3 className="font-semibold mb-2">🧠 تفكير منطقي</h3>
          <p className="text-sm text-muted-foreground">شاهد كيف يفكر الذكاء الاصطناعي للوصول للإجابة</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6 border rounded-lg bg-card"
        >
          <h3 className="font-semibold mb-2">🌐 دعم العربية</h3>
          <p className="text-sm text-muted-foreground">واجهة كاملة باللغة العربية مع دعم شامل</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
