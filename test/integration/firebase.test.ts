// test/unit/firebase.test.ts

import { saveUserLogin } from '@/lib/firebase-db'
import { addDoc, setDoc, getDoc } from 'firebase/firestore'

// mock firestore
jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn(),
  collection: jest.fn(),
  serverTimestamp: jest.fn(),
}))

jest.mock('@/lib/firebase', () => ({
  db: {},
  isFirebaseConfigured: true,
}))

describe('Firebase Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('saveUserLogin writes user + login event', async () => {
    ;(getDoc as jest.Mock).mockResolvedValue({
      exists: () => false,
    })

    await saveUserLogin({ email: 'test@test.com' })

    expect(setDoc).toHaveBeenCalled()
    expect(addDoc).toHaveBeenCalled()
  })
})