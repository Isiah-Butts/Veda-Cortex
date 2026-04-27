import React, { useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TextInput } from 'react-native'
import { Button, Card } from '../components/UI'
import { useApp } from '../lib/app-context'
import { saveUserLogin } from '../lib/firebase-db'
import { isFirebaseConfigured } from '../lib/firebase'
import { colors } from '../lib/theme'

export function LoginScreen() {
  const { setCurrentPage, setIsLoggedIn, setCurrentUserEmail, hairProfile } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [saving, setSaving] = useState(false)

  const completeLogin = async () => {
    const normalizedEmail = email.trim().toLowerCase()
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) return Alert.alert('Email required', 'Please enter a valid email address.')
    if (password.length < 6) return Alert.alert('Password required', 'Password must be at least 6 characters.')
    setSaving(true)
    try {
      await saveUserLogin({ email: normalizedEmail })
      setCurrentUserEmail(normalizedEmail)
      setIsLoggedIn(true)
      setCurrentPage(hairProfile ? 'dashboard' : 'quiz')
    } catch {
      Alert.alert('Firebase error', 'We could not save your login details right now.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <Text style={styles.icon}>🌿</Text>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to access your hair profile and dashboard.</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} placeholder="you@example.com" autoCapitalize="none" keyboardType="email-address" style={styles.input} />
        <Text style={styles.label}>Password</Text>
        <TextInput value={password} onChangeText={setPassword} placeholder="••••••" secureTextEntry style={styles.input} />
        <Button title={saving ? 'Saving...' : 'Sign In'} disabled={saving} onPress={completeLogin} />
        <Button title="Sign up for free" variant="ghost" onPress={completeLogin} />
        <Text style={styles.note}>{isFirebaseConfigured ? 'Login activity will be saved to Firebase. Passwords are not stored by this app.' : 'Firebase is not configured yet. Add Expo Firebase keys to mobile/.env to save login data.'}</Text>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20, backgroundColor: colors.bg },
  icon: { fontSize: 34, textAlign: 'center' },
  title: { fontSize: 28, fontWeight: '800', color: colors.text, textAlign: 'center', marginTop: 12 },
  subtitle: { color: colors.muted, textAlign: 'center', marginTop: 8, marginBottom: 20, lineHeight: 20 },
  label: { color: colors.text, fontWeight: '700', marginTop: 12, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: colors.border, backgroundColor: '#fff', borderRadius: 14, minHeight: 50, paddingHorizontal: 14, marginBottom: 6, fontSize: 16 },
  note: { color: colors.muted, fontSize: 12, textAlign: 'center', marginTop: 16, lineHeight: 18 },
})
