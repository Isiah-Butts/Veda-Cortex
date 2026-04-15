'use client'

import { useState } from 'react'
import { useApp } from '@/lib/app-context'
import { isFirebaseConfigured } from '@/lib/firebase'
import { saveUserLogin } from '@/lib/firebase-db'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Leaf } from 'lucide-react'

export function LoginPage() {
  const { setIsLoggedIn, setCurrentPage, hairProfile, setCurrentUserEmail } =
    useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {}
    if (!email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.'
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required.'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const completeLogin = async () => {
    if (!validate()) return
    setSubmitError('')
    setIsSubmitting(true)

    const normalizedEmail = email.trim().toLowerCase()

    try {
      await saveUserLogin({ email: normalizedEmail })
    } catch (error) {
      console.error('Unable to save login event to Firebase.', error)
      setSubmitError('We could not save your login details right now.')
      setIsSubmitting(false)
      return
    }

    setCurrentUserEmail(normalizedEmail)
    setIsLoggedIn(true)
    if (hairProfile) {
      setCurrentPage('dashboard')
    } else {
      setCurrentPage('quiz')
    }
    setIsSubmitting(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await completeLogin()
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Leaf className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="font-serif text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to access your hair profile and dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {errors.email}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? 'password-error' : undefined
                }
              />
              {errors.password && (
                <p
                  id="password-error"
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {errors.password}
                </p>
              )}
            </div>
            <Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          {submitError ? (
            <p className="mt-4 text-center text-sm text-destructive">
              {submitError}
            </p>
          ) : null}
          <p className="mt-4 text-center text-xs text-muted-foreground">
            {isFirebaseConfigured
              ? 'Login activity will be saved to Firebase. Passwords are not stored by this app.'
              : 'Firebase is not configured yet. Add your team Firebase keys to .env.local to start saving login data.'}
          </p>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={completeLogin}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign up for free
            </button>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
