import React, { useState } from 'react'
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Card } from '../components/UI'
import { useApp } from '../lib/app-context'
import { quizQuestions } from '../lib/quiz-data'
import { images } from '../lib/images'
import { saveQuizResult } from '../lib/firebase-db'
import { isFirebaseConfigured } from '../lib/firebase'
import { colors } from '../lib/theme'

export function QuizScreen() {
  const { quizAnswers, setQuizAnswer, computeResults, setCurrentPage, currentUserEmail } = useApp()
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const question = quizQuestions[step]
  const answer = quizAnswers[question.id] || ''
  const progress = Math.round(((step + 1) / quizQuestions.length) * 100)

  const next = () => {
    if (!answer) return Alert.alert('Choose an option', 'Please select an option before continuing.')
    if (step < quizQuestions.length - 1) setStep(step + 1)
  }

  const submit = async () => {
    if (!answer) return Alert.alert('Choose an option', 'Please select an option before continuing.')
    setSaving(true)
    const data = computeResults()
    try {
      await saveQuizResult({ email: currentUserEmail, answers: quizAnswers, ...data })
      setCurrentPage('results')
    } catch {
      Alert.alert('Firebase error', 'We could not save your quiz results right now.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.progressRow}><Text style={styles.muted}>Question {step + 1} of {quizQuestions.length}</Text><Text style={styles.muted}>{progress}% complete</Text></View>
      <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${progress}%` }]} /></View>
      <Card style={styles.card}>
        <Text style={styles.title}>{question.question}</Text>
        <Text style={styles.subtitle}>{question.description}</Text>
        {question.options.map((option) => {
          const selected = answer === option.value
          const source = images[option.image]
          return (
            <Pressable key={option.value} onPress={() => setQuizAnswer(question.id, option.value)} style={[styles.option, selected && styles.optionSelected]}>
              {source ? <Image source={source} resizeMode="contain" style={styles.optionImage} /> : <View style={styles.imageFallback}><Text style={styles.fallbackText}>Hair strand guide</Text></View>}
              <View style={styles.optionBody}>
                <View style={[styles.radio, selected && styles.radioSelected]}><Text style={styles.check}>{selected ? '✓' : ''}</Text></View>
                <View style={{ flex: 1 }}><Text style={[styles.optionTitle, selected && { color: colors.primary }]}>{option.label}</Text><Text style={styles.optionDesc}>{option.description}</Text></View>
              </View>
            </Pressable>
          )
        })}
        <Text style={styles.note}>{isFirebaseConfigured ? 'Quiz responses are saved to Firebase when you submit.' : 'Firebase is not configured yet. Add Expo Firebase keys to mobile/.env to save quiz responses.'}</Text>
      </Card>
      <View style={styles.nav}>
        <Button title="Back" variant="ghost" disabled={step === 0} onPress={() => setStep(Math.max(0, step - 1))} />
        {step === quizQuestions.length - 1 ? <Button title={saving ? 'Saving...' : 'See My Results'} disabled={saving} onPress={submit} /> : <Button title="Next" onPress={next} />}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40, backgroundColor: colors.bg },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  muted: { color: colors.muted, fontSize: 13 },
  progressTrack: { height: 8, borderRadius: 999, backgroundColor: colors.border, marginTop: 8, marginBottom: 20, overflow: 'hidden' },
  progressFill: { height: 8, backgroundColor: colors.primary },
  card: { padding: 14 },
  title: { color: colors.text, fontSize: 25, fontWeight: '800', textAlign: 'center', marginTop: 6 },
  subtitle: { color: colors.muted, textAlign: 'center', marginTop: 8, marginBottom: 14, lineHeight: 20 },
  option: { borderWidth: 2, borderColor: colors.border, borderRadius: 20, marginBottom: 12, overflow: 'hidden', backgroundColor: '#fff' },
  optionSelected: { borderColor: colors.primary, backgroundColor: '#fff8f2' },
  optionImage: { width: '100%', height: 220, backgroundColor: '#f7efe7' },
  imageFallback: { height: 120, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f7efe7' },
  fallbackText: { color: colors.muted },
  optionBody: { flexDirection: 'row', padding: 14, gap: 12 },
  radio: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#c9b9ad', alignItems: 'center', justifyContent: 'center' },
  radioSelected: { borderColor: colors.primary, backgroundColor: colors.primary },
  check: { color: '#fff', fontWeight: '800' },
  optionTitle: { color: colors.text, fontWeight: '800', fontSize: 16 },
  optionDesc: { color: colors.muted, fontSize: 13, lineHeight: 18, marginTop: 3 },
  note: { color: colors.muted, fontSize: 12, textAlign: 'center', marginTop: 4 },
  nav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 },
})
