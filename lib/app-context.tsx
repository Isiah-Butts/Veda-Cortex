'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import {
  type HairProfile,
  type Product,
  type RoutineStep,
  getHairType,
  getRoutineSteps,
  getRecommendedProducts,
} from '@/lib/quiz-data'

type Page = 'landing' | 'quiz' | 'results' | 'dashboard' | 'login'

interface QuizAnswers {
  [questionId: string]: string
}

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
  setIsLoggedIn: (v: boolean) => void
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

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('landing')
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null)
  const [hairProfile, setHairProfile] = useState<HairProfile | null>(null)
  const [routineSteps, setRoutineSteps] = useState<RoutineStep[]>([])
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])
  const [savedProducts, setSavedProducts] = useState<Product[]>([])
  const [routineChecks, setRoutineChecks] = useState<Record<string, boolean>>(
    {}
  )

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

  const buildComputedQuizData = useCallback(
    (answers: QuizAnswers): ComputedQuizData => {
      const profile: HairProfile = {
        hairType: getHairType(
          answers.curl_pattern || '2',
          answers.curl_subtype || 'A'
        ),
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
    },
    []
  )

  const computeResults = useCallback(() => {
    const computedData = buildComputedQuizData(quizAnswers)
    setHairProfile(computedData.hairProfile)
    setRoutineSteps(computedData.routineSteps)
    setRecommendedProducts(computedData.recommendedProducts)

    const checks: Record<string, boolean> = {}
    computedData.routineSteps.forEach((step) => {
      checks[step.id] = false
    })
    setRoutineChecks(checks)
    return computedData
  }, [buildComputedQuizData, quizAnswers])

  const toggleSaveProduct = useCallback((product: Product) => {
    setSavedProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id)
      if (exists) return prev.filter((p) => p.id !== product.id)
      return [...prev, product]
    })
  }, [])

  const toggleRoutineCheck = useCallback((stepId: string) => {
    setRoutineChecks((prev) => ({ ...prev, [stepId]: !prev[stepId] }))
  }, [])

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        quizAnswers,
        setQuizAnswer,
        resetQuiz,
        isLoggedIn,
        setIsLoggedIn,
        currentUserEmail,
        setCurrentUserEmail,
        hairProfile,
        routineSteps,
        recommendedProducts,
        computeResults,
        savedProducts,
        toggleSaveProduct,
        routineChecks,
        toggleRoutineCheck,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
