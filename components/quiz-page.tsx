'use client'

import { useState } from 'react'
import { useApp } from '@/lib/app-context'
import { isFirebaseConfigured } from '@/lib/firebase'
import { saveQuizResult } from '@/lib/firebase-db'
import { quizQuestions } from '@/lib/quiz-data'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function QuizPage() {
  const {
    quizAnswers,
    setQuizAnswer,
    computeResults,
    setCurrentPage,
    currentUserEmail,
  } = useApp()
  const [currentStep, setCurrentStep] = useState(0)
  const [validationError, setValidationError] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalSteps = quizQuestions.length
  const question = quizQuestions[currentStep]
  const progress = ((currentStep + 1) / totalSteps) * 100
  const currentAnswer = quizAnswers[question.id] || ''

  const handleNext = () => {
    if (!currentAnswer) {
      setValidationError(true)
      return
    }
    setValidationError(false)
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    setValidationError(false)
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!currentAnswer) {
      setValidationError(true)
      return
    }
    setSubmitError('')
    setIsSubmitting(true)
    const computedData = computeResults()

    try {
      await saveQuizResult({
        email: currentUserEmail,
        answers: quizAnswers,
        hairProfile: computedData.hairProfile,
        routineSteps: computedData.routineSteps,
        recommendedProducts: computedData.recommendedProducts,
      })
    } catch (error) {
      console.error('Unable to save quiz result to Firebase.', error)
      setSubmitError('We could not save your quiz results right now.')
      setIsSubmitting(false)
      return
    }

    setCurrentPage('results')
    setIsSubmitting(false)
  }

  const handleSelectOption = (value: string) => {
    setQuizAnswer(question.id, value)
    setValidationError(false)
  }

  const isLastStep = currentStep === totalSteps - 1

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 md:py-16">
      {/* Progress header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Question {currentStep + 1} of {totalSteps}
          </span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question card */}
      <Card className="border-border shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-2xl text-foreground md:text-3xl">
            {question.question}
          </CardTitle>
          <CardDescription className="text-base">
            {question.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {question.options.map((option) => {
            const isSelected = currentAnswer === option.value
            return (
              <button
                key={option.value}
                onClick={() => handleSelectOption(option.value)}
                className={cn(
                  'flex flex-col rounded-xl border-2 p-0 text-left transition-all overflow-hidden',
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border bg-background hover:border-primary/40 hover:bg-muted/50'
                )}
                aria-pressed={isSelected}
              >
                <div className="relative w-full shrink-0 border-b border-border bg-muted p-2 sm:p-3 [height:clamp(13rem,min(38dvh,78vw),26rem)] sm:[height:clamp(15rem,min(36dvh,72vw),28rem)]">
                  <Image
                    src={option.image}
                    alt={option.label}
                    fill
                    sizes="(max-width: 640px) 100vw, min(672px, 100vw)"
                    className="object-contain object-center"
                  />
                </div>
                <div className="flex items-start gap-3 p-4">
                  <div
                    className={cn(
                      'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                      isSelected
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted-foreground/30'
                    )}
                  >
                    {isSelected && <CheckCircle2 className="h-4 w-4" />}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span
                      className={cn(
                        'font-medium',
                        isSelected ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {option.label}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {option.description}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}

          {validationError && (
            <p className="mt-1 text-center text-sm text-destructive" role="alert">
              Please select an option before continuing.
            </p>
          )}
          {submitError ? (
            <p className="mt-1 text-center text-sm text-destructive" role="alert">
              {submitError}
            </p>
          ) : null}
          <p className="mt-1 text-center text-xs text-muted-foreground">
            {isFirebaseConfigured
              ? 'Quiz responses are saved to Firebase when you submit.'
              : 'Firebase is not configured yet. Add your team Firebase keys to .env.local to start saving quiz responses.'}
          </p>
        </CardContent>
      </Card>

      {/* Navigation buttons */}
      <div className="mt-6 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        {isLastStep ? (
          <Button onClick={handleSubmit} className="gap-2" disabled={isSubmitting}>
            {isSubmitting ? 'Saving Results...' : 'See My Results'}
            <CheckCircle2 className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleNext} className="gap-2">
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </main>
  )
}
