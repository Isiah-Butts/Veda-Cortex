import React, { createContext, useCallback, useContext, useState } from 'react'
import { getHairType, getRecommendedProducts, getRoutineSteps, HairProfile, Product, RoutineStep } from './quiz-data'

export type Page = 'landing' | 'quiz' | 'results' | 'dashboard' | 'login'
export interface QuizAnswers { [questionId: string]: string }

interface ComputedQuizData {
  hairProfile: HairProfile
  routineSteps: RoutineStep[]
  recommendedProducts: Product[]
}

interface AppContextType {
  currentPage: Page
  setCurrentPage: (page: Page) => void
  quizAnswers: QuizAnswers
  setQuizAnswer: (questionId: string, value: string) => void
  resetQuiz: () => void
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
  currentUserEmail: string | null
  setCurrentUserEmail: (email: string | null) => void
  hairProfile: HairProfile | null
  routineSteps: RoutineStep[]
  recommendedProducts: Product[]
  computeResults: () => ComputedQuizData
  savedProducts: Product[]
  toggleSaveProduct: (product: Product) => void
  routineChecks: Record<string, boolean>
  toggleRoutineCheck: (stepId: string) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('landing')
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null)
  const [hairProfile, setHairProfile] = useState<HairProfile | null>(null)
  const [routineSteps, setRoutineSteps] = useState<RoutineStep[]>([])
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])
  const [savedProducts, setSavedProducts] = useState<Product[]>([])
  const [routineChecks, setRoutineChecks] = useState<Record<string, boolean>>({})

  const setQuizAnswer = useCallback((questionId: string, value: string) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: value }))
  }, [])

  const resetQuiz = useCallback(() => {
    setQuizAnswers({})
    setHairProfile(null)
    setRoutineSteps([])
    setRecommendedProducts([])
    setRoutineChecks({})
  }, [])

  const buildComputedQuizData = useCallback((answers: QuizAnswers): ComputedQuizData => {
    const profile: HairProfile = {
      hairType: getHairType(answers.curl_pattern || '2', answers.curl_subtype || 'A'),
      porosity: answers.porosity || 'medium',
      scalpCondition: answers.scalp_condition || 'balanced',
      thickness: answers.thickness || 'medium',
      density: answers.density || 'medium',
      goal: answers.goals || 'moisture',
    }
    return {
      hairProfile: profile,
      routineSteps: getRoutineSteps(profile),
      recommendedProducts: getRecommendedProducts(profile),
    }
  }, [])

  const computeResults = useCallback(() => {
    const data = buildComputedQuizData(quizAnswers)
    setHairProfile(data.hairProfile)
    setRoutineSteps(data.routineSteps)
    setRecommendedProducts(data.recommendedProducts)
    const checks: Record<string, boolean> = {}
    data.routineSteps.forEach((step) => { checks[step.id] = false })
    setRoutineChecks(checks)
    return data
  }, [buildComputedQuizData, quizAnswers])

  const toggleSaveProduct = useCallback((product: Product) => {
    setSavedProducts((prev) => prev.some((p) => p.id === product.id) ? prev.filter((p) => p.id !== product.id) : [...prev, product])
  }, [])

  const toggleRoutineCheck = useCallback((stepId: string) => {
    setRoutineChecks((prev) => ({ ...prev, [stepId]: !prev[stepId] }))
  }, [])

  return <AppContext.Provider value={{ currentPage, setCurrentPage, quizAnswers, setQuizAnswer, resetQuiz, isLoggedIn, setIsLoggedIn, currentUserEmail, setCurrentUserEmail, hairProfile, routineSteps, recommendedProducts, computeResults, savedProducts, toggleSaveProduct, routineChecks, toggleRoutineCheck }}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
