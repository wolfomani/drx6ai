"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react"

export function InteractiveQuiz({ title, description, questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
    setQuizCompleted(false)
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++
      }
    })
    return correct
  }

  const getScorePercentage = () => {
    return Math.round((calculateScore() / questions.length) * 100)
  }

  const getScoreColor = () => {
    const percentage = getScorePercentage()
    if (percentage >= 80) return "text-green-400"
    if (percentage >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  if (showResults) {
    const score = calculateScore()
    const percentage = getScorePercentage()

    return (
      <Card className="bg-[#21262d] border-[#30363d] max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Trophy className="w-16 h-16 text-yellow-400" />
          </div>
          <CardTitle className="text-2xl">نتائج الاختبار</CardTitle>
          <CardDescription>لقد أكملت الاختبار بنجاح!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor()}`}>
              {score} / {questions.length}
            </div>
            <div className={`text-2xl font-semibold ${getScoreColor()}`}>{percentage}%</div>
            <Badge
              className={`mt-2 ${percentage >= 80 ? "bg-green-600" : percentage >= 60 ? "bg-yellow-600" : "bg-red-600"}`}
            >
              {percentage >= 80 ? "ممتاز" : percentage >= 60 ? "جيد" : "يحتاج تحسين"}
            </Badge>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">مراجعة الإجابات</h3>
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index]
              const isCorrect = userAnswer === question.correctAnswer

              return (
                <Card key={question.id} className="bg-[#161b22] border-[#30363d]">
                  <CardHeader>
                    <div className="flex items-start space-x-3 space-x-reverse">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <CardTitle className="text-base">{question.question}</CardTitle>
                        <div className="mt-3 space-y-2">
                          <div className="text-sm">
                            <span className="text-[#8b949e]">إجابتك: </span>
                            <span className={isCorrect ? "text-green-400" : "text-red-400"}>
                              {question.options[userAnswer]}
                            </span>
                          </div>
                          {!isCorrect && (
                            <div className="text-sm">
                              <span className="text-[#8b949e]">الإجابة الصحيحة: </span>
                              <span className="text-green-400">{question.options[question.correctAnswer]}</span>
                            </div>
                          )}
                          <div className="text-sm text-[#8b949e] bg-[#0d1117] p-3 rounded-lg mt-2">
                            <strong>التفسير: </strong>
                            {question.explanation}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleRestart}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <RotateCcw className="w-4 h-4 ml-2" />
              إعادة الاختبار
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentQ = questions[currentQuestion]

  return (
    <Card className="bg-[#21262d] border-[#30363d] max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline">
            السؤال {currentQuestion + 1} من {questions.length}
          </Badge>
          <div className="w-full max-w-xs bg-[#30363d] rounded-full h-2 mx-4">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <CardTitle className="text-xl">{currentQ.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
              className={`w-full text-right justify-start p-4 h-auto ${
                selectedAnswers[currentQuestion] === index
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  : "hover:bg-[#30363d]"
              }`}
              onClick={() => handleAnswerSelect(index)}
            >
              <span className="flex-1 text-right">{option}</span>
            </Button>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="hover:bg-[#30363d] bg-transparent"
          >
            السابق
          </Button>

          <div className="text-sm text-[#8b949e]">
            {selectedAnswers.filter((answer) => answer !== undefined).length} / {questions.length} مجاب عليها
          </div>

          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {currentQuestion === questions.length - 1 ? "إنهاء الاختبار" : "التالي"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
