import AsyncStorage from '@react-native-async-storage/async-storage'
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db, isFirebaseConfigured } from './firebase'
import type { HairProfile, Product, RoutineStep } from './quiz-data'

export interface StoredQuizAnswers { [questionId: string]: string }

async function getSessionId() {
  const key = 'veda-cortex-session-id'
  const existing = await AsyncStorage.getItem(key)
  if (existing) return existing
  const id = `mobile-session-${Date.now()}-${Math.random().toString(36).slice(2)}`
  await AsyncStorage.setItem(key, id)
  return id
}

function getUserDocumentId(email: string) {
  return encodeURIComponent(email.trim().toLowerCase())
}

export async function saveUserLogin({ email }: { email: string }) {
  if (!db || !isFirebaseConfigured) return false
  const normalizedEmail = email.trim().toLowerCase()
  const sessionId = await getSessionId()
  const userRef = doc(db, 'users', getUserDocumentId(normalizedEmail))
  const userSnapshot = await getDoc(userRef)

  await setDoc(userRef, {
    email: normalizedEmail,
    sessionId,
    platform: 'mobile',
    updatedAt: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
    ...(userSnapshot.exists() ? {} : { createdAt: serverTimestamp() }),
  }, { merge: true })

  await addDoc(collection(db, 'loginEvents'), {
    email: normalizedEmail,
    sessionId,
    platform: 'mobile',
    loggedInAt: serverTimestamp(),
  })

  return true
}

export async function saveQuizResult(input: {
  email?: string | null
  answers: StoredQuizAnswers
  hairProfile: HairProfile
  routineSteps: RoutineStep[]
  recommendedProducts: Product[]
}) {
  if (!db || !isFirebaseConfigured) return false
  const normalizedEmail = input.email?.trim().toLowerCase() || null
  const sessionId = await getSessionId()

  await addDoc(collection(db, 'quizResults'), {
    email: normalizedEmail,
    sessionId,
    platform: 'mobile',
    answers: input.answers,
    hairProfile: input.hairProfile,
    routineSteps: input.routineSteps,
    recommendedProducts: input.recommendedProducts,
    submittedAt: serverTimestamp(),
  })

  if (normalizedEmail) {
    await setDoc(doc(db, 'users', getUserDocumentId(normalizedEmail)), {
      email: normalizedEmail,
      sessionId,
      latestHairProfile: input.hairProfile,
      latestQuizAnswers: input.answers,
      latestRoutineSteps: input.routineSteps,
      latestRecommendedProducts: input.recommendedProducts,
      updatedAt: serverTimestamp(),
    }, { merge: true })
  }

  return true
}
