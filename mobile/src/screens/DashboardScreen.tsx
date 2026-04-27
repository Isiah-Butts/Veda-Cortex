import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Card, Chip } from '../components/UI'
import { useApp } from '../lib/app-context'
import { colors } from '../lib/theme'

const iconMap: Record<string, string> = { droplets: '💧', heart: '🤎', sparkles: '✨', wind: '🌬️' }

export function DashboardScreen() {
  const { hairProfile, routineSteps, routineChecks, toggleRoutineCheck, savedProducts, toggleSaveProduct, setCurrentPage, resetQuiz } = useApp()
  if (!hairProfile) {
    return <View style={styles.empty}><Text style={styles.title}>Welcome to Your Dashboard</Text><Text style={styles.muted}>Take the hair quiz first to see your personalized profile and routine here.</Text><Button title="Take the Quiz" onPress={() => setCurrentPage('quiz')} /></View>
  }
  const completed = Object.values(routineChecks).filter(Boolean).length
  const percent = routineSteps.length ? Math.round((completed / routineSteps.length) * 100) : 0
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Dashboard</Text>
      <Text style={styles.muted}>Track your routine and manage your hair care journey.</Text>
      <Button title="Retake Quiz" variant="outline" onPress={() => { resetQuiz(); setCurrentPage('quiz') }} />
      <Card style={styles.card}>
        <Text style={styles.section}>✨ Hair Profile</Text>
        <Text style={styles.profile}>{hairProfile.hairType}</Text>
        <View style={styles.chips}>
          <Chip label={`${hairProfile.porosity} porosity`} />
          <Chip label={`${hairProfile.scalpCondition} scalp`} />
          <Chip label={`${hairProfile.thickness} strands`} />
          <Chip label={`${hairProfile.density} density`} />
          <Chip label={`Goal: ${hairProfile.goal}`} strong />
        </View>
      </Card>
      <Card style={styles.card}>
        <View style={styles.row}><Text style={styles.section}>Daily Routine</Text><Text style={styles.badge}>{completed}/{routineSteps.length} done</Text></View>
        {routineSteps.map((step) => {
          const checked = routineChecks[step.id] ?? false
          return (
            <Pressable key={step.id} onPress={() => toggleRoutineCheck(step.id)} style={[styles.step, checked && styles.stepChecked]}>
              <Text style={styles.stepIcon}>{checked ? '✅' : iconMap[step.icon] || '✨'}</Text>
              <View style={{ flex: 1 }}><Text style={[styles.stepTitle, checked && styles.done]}>{step.name}</Text><Text style={styles.muted}>{step.frequency}</Text></View>
              <Text style={styles.toggle}>{checked ? 'On' : 'Off'}</Text>
            </Pressable>
          )
        })}
        <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${percent}%` }]} /></View>
        <Text style={styles.progressText}>Today's progress: {percent}%</Text>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.section}>🔖 Saved Products</Text>
        {savedProducts.length === 0 ? <View style={styles.savedEmpty}><Text style={styles.muted}>No products saved yet.</Text><Button title="View Results" variant="outline" onPress={() => setCurrentPage('results')} /></View> : savedProducts.map((product) => (
          <View key={product.id} style={styles.product}><View style={{ flex: 1 }}><Text style={styles.category}>{product.category}</Text><Text style={styles.stepTitle}>{product.name}</Text><Text style={styles.muted}>{product.brand} · {product.price}</Text></View><Pressable onPress={() => toggleSaveProduct(product)}><Text style={styles.remove}>★</Text></Pressable></View>
        ))}
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 44, backgroundColor: colors.bg, gap: 12 },
  empty: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg, gap: 14 },
  title: { color: colors.text, fontSize: 30, fontWeight: '900', marginTop: 8 },
  muted: { color: colors.muted, lineHeight: 20 },
  card: { marginTop: 6 },
  section: { color: colors.text, fontSize: 20, fontWeight: '900', marginBottom: 10 },
  profile: { color: colors.text, fontSize: 25, fontWeight: '900', marginBottom: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { color: colors.primary, fontWeight: '800', backgroundColor: colors.primarySoft, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  step: { flexDirection: 'row', gap: 12, padding: 13, borderWidth: 1, borderColor: colors.border, borderRadius: 18, marginBottom: 10, alignItems: 'center' },
  stepChecked: { backgroundColor: '#fff8f2', borderColor: '#dfc4af' },
  stepIcon: { fontSize: 24 },
  stepTitle: { color: colors.text, fontWeight: '800' },
  done: { color: colors.primary, textDecorationLine: 'line-through' },
  toggle: { color: colors.primary, fontWeight: '800' },
  progressTrack: { height: 8, borderRadius: 999, backgroundColor: colors.border, overflow: 'hidden', marginTop: 8 },
  progressFill: { height: 8, backgroundColor: colors.primary },
  progressText: { color: colors.text, fontWeight: '700', textAlign: 'right', marginTop: 8 },
  savedEmpty: { alignItems: 'center', gap: 12, paddingVertical: 16 },
  product: { flexDirection: 'row', borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 12, marginBottom: 10 },
  category: { color: colors.muted, fontSize: 11, fontWeight: '900', textTransform: 'uppercase' },
  remove: { color: colors.primary, fontSize: 24 },
})
