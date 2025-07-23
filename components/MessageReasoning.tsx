"use client"

import { useState } from "react"
import { ChevronDownIcon, LoaderIcon } from "./icons"
import { motion, AnimatePresence } from "framer-motion"

interface MessageReasoningProps {
  isLoading: boolean
  reasoning: string
}

export function MessageReasoning({ isLoading, reasoning }: MessageReasoningProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const variants = {
    collapsed: {
      height: 0,
      opacity: 0,
      marginTop: 0,
      marginBottom: 0,
    },
    expanded: {
      height: "auto",
      opacity: 1,
      marginTop: "1rem",
      marginBottom: "0.5rem",
    },
  }

  const formatReasoning = (reasoning: string) => {
    if (!reasoning) return reasoning

    // معالجة الوسوم المختلفة
    const formatted = reasoning
      .replace(/<Thinking>/g, '<div class="reasoning-section thinking"><strong>🤔 تفكير:</strong>')
      .replace(/<\/Thinking>/g, "</div>")
      .replace(/<تأمل>/g, '<div class="reasoning-section reflection"><strong>🤔 تأمل:</strong>')
      .replace(/<\/تأمل>/g, "</div>")
      .replace(/<مكافأة>/g, '<div class="reasoning-section reward"><strong>⭐ مكافأة:</strong>')
      .replace(/<\/مكافأة>/g, "</div>")
      .replace(/<معادلة>/g, '<div class="reasoning-section equation"><strong>📐 معادلة:</strong>')
      .replace(/<\/معادلة>/g, "</div>")
      .replace(/<تحقق>/g, '<div class="reasoning-section verification"><strong>✅ تحقق:</strong>')
      .replace(/<\/تحقق>/g, "</div>")
      .replace(/<تأكيد>/g, '<div class="reasoning-section confirmation"><strong>🎯 تأكيد:</strong>')
      .replace(/<\/تأكيد>/g, "</div>")
      .replace(/<إجابة>/g, '<div class="reasoning-section answer"><strong>💡 إجابة:</strong>')
      .replace(/<\/إجابة>/g, "</div>")
      .replace(/<تأمل نهائي>/g, '<div class="reasoning-section final-reflection"><strong>🏁 تأمل نهائي:</strong>')
      .replace(/<\/تأمل نهائي>/g, "</div>")

    return formatted
  }

  if (!reasoning && !isLoading) return null

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="flex flex-row gap-2 items-center text-sm text-muted-foreground">
          <div className="font-medium">🔍 التفكير الداخلي للنموذج...</div>
          <div className="animate-spin">
            <LoaderIcon size={16} />
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-2 items-center text-sm text-muted-foreground">
          <div className="font-medium">🔍 التفكير الداخلي للنموذج</div>
          <button
            data-testid="message-reasoning-toggle"
            type="button"
            className="cursor-pointer hover:text-foreground transition-colors p-1 rounded"
            onClick={() => {
              setIsExpanded(!isExpanded)
            }}
          >
            <ChevronDownIcon size={16} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}

      <AnimatePresence initial={false}>
        {isExpanded && reasoning && (
          <motion.div
            data-testid="message-reasoning"
            key="content"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={variants}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
            className="mt-2 p-3 border rounded-lg bg-muted/50 text-sm"
          >
            <div className="text-muted-foreground">
              <div dangerouslySetInnerHTML={{ __html: formatReasoning(reasoning) }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .reasoning-section {
          margin: 0.5rem 0;
          padding: 0.5rem;
          border-left: 3px solid var(--border);
          background: var(--muted);
          border-radius: 0.375rem;
        }
        .reasoning-section.thinking {
          border-left-color: #3b82f6;
        }
        .reasoning-section.reflection {
          border-left-color: #8b5cf6;
        }
        .reasoning-section.reward {
          border-left-color: #f59e0b;
        }
        .reasoning-section.equation {
          border-left-color: #10b981;
        }
        .reasoning-section.verification {
          border-left-color: #06b6d4;
        }
        .reasoning-section.confirmation {
          border-left-color: #ef4444;
        }
        .reasoning-section.answer {
          border-left-color: #f97316;
        }
        .reasoning-section.final-reflection {
          border-left-color: #84cc16;
        }
      `}</style>
    </div>
  )
}
