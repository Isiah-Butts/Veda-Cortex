'use client'

import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from '@/lib/firebase'
import type { HairProfile, Product, RoutineStep } from '@/lib/quiz-data'

export interface StoredQuizAnswers {
  [questionId: string]: string
}

interface SaveUserLoginInput {
  email: string
}

interface SaveQuizResultInput {
  email?: string | null
  answers: StoredQuizAnswers
  hairProfile: HairProfile
  routineSteps: RoutineStep[]
  recommendedProducts: Product[]
}

function getSessionId() {
  if (typeof window === 'undefined') {
    return 'server-session'
  }

  const storageKey = 'veda-cortex-session-id'
  const existingSessionId = window.localStorage.getItem(storageKey)

  if (existingSessionId) {
    return existingSessionId
  }

  const sessionId = window.crypto?.randomUUID?.() ?? `session-${Date.now()}`
  window.localStorage.setItem(storageKey, sessionId)
  return sessionId
}

function getUserDocumentId(email: string) {
  return encodeURIComponent(email.trim().toLowerCase())
}

export async function saveUserLogin({ email }: SaveUserLoginInput) {
  if (!db || !isFirebaseConfigured) {
    return false
  }

  const normalizedEmail = email.trim().toLowerCase()
  const sessionId = getSessionId()
  const userRef = doc(db, 'users', getUserDocumentId(normalizedEmail))
  const userSnapshot = await getDoc(userRef)

  await setDoc(
    userRef,
    {
      email: normalizedEmail,
      sessionId,
      updatedAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      ...(userSnapshot.exists() ? {} : { createdAt: serverTimestamp() }),
    },
    { merge: true }
  )

  await addDoc(collection(db, 'loginEvents'), {
    email: normalizedEmail,
    sessionId,
    loggedInAt: serverTimestamp(),
  })

  return true
}

export async function saveQuizResult({
  email,
  answers,
  hairProfile,
  routineSteps,
  recommendedProducts,
}: SaveQuizResultInput) {
  if (!db || !isFirebaseConfigured) {
    return false
  }

  const normalizedEmail = email?.trim().toLowerCase() || null
  const sessionId = getSessionId()

  await addDoc(collection(db, 'quizResults'), {
    email: normalizedEmail,
    sessionId,
    answers,
    hairProfile,
    routineSteps,
    recommendedProducts,
    submittedAt: serverTimestamp(),
  })

  if (normalizedEmail) {
    await setDoc(
      doc(db, 'users', getUserDocumentId(normalizedEmail)),
      {
        email: normalizedEmail,
        sessionId,
        latestHairProfile: hairProfile,
        latestQuizAnswers: answers,
        latestRoutineSteps: routineSteps,
        latestRecommendedProducts: recommendedProducts,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )
  }

  return true
}
