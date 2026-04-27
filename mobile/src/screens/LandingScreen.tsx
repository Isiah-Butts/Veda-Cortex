import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Card } from '../components/UI'
import { useApp } from '../lib/app-context'
import { images } from '../lib/images'
import { colors } from '../lib/theme'

const steps = [
  ['📋', 'Take the Quiz', 'Answer a few simple questions about your hair, scalp, and goals.'],
  ['✨', 'Get Your Profile', 'Discover your hair type, porosity, and personalized insights.'],
  ['💧', 'Follow Your Routine', 'Receive a step-by-step routine tailored to your unique hair needs.'],
  ['🛍️', 'Shop Products', 'Browse curated product picks that work for your specific hair type.'],
]

export function LandingScreen() {
  const { setCurrentPage } = useApp()
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.badge}><Text style={styles.badgeText}>✨ Personalized Hair Care</Text></View>
      <Text style={styles.title}>Understand Your Hair. Transform Your Routine.</Text>
      <Text style={styles.subtitle}>Take our science-backed quiz to discover your hair type, get a personalized care routine, and find products that actually work for you.</Text>
      <Image source={images['/firstpage.jpg']} style={styles.hero} resizeMode="contain" />
      <View style={styles.actions}>
        <Button title="Take Hair Quiz" onPress={() => setCurrentPage('quiz')} />
        <Button title="Log In" variant="outline" onPress={() => setCurrentPage('login')} />
      </View>
      <Text style={styles.sectionTitle}>How It Works</Text>
      {steps.map(([icon, title, body], index) => (
        <Card key={title} style={styles.stepCard}>
          <Text style={styles.stepIcon}>{icon}</Text>
          <Text style={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</Text>
          <Text style={styles.stepTitle}>{title}</Text>
          <Text style={styles.stepBody}>{body}</Text>
        </Card>
      ))}
      <Button title="Start the Quiz" onPress={() => setCurrentPage('quiz')} />
      <Text style={styles.footer}>Veda Cortex. Personalized hair care, backed by science.</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 44, backgroundColor: colors.bg },
  badge: { alignSelf: 'flex-start', backgroundColor: colors.primarySoft, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8, marginTop: 10 },
  badgeText: { color: colors.primary, fontWeight: '700' },
  title: { color: colors.text, fontSize: 38, lineHeight: 43, fontWeight: '800', marginTop: 22 },
  subtitle: { color: colors.muted, fontSize: 16, lineHeight: 24, marginTop: 14 },
  hero: { width: '100%', height: 330, backgroundColor: '#f7efe7', borderRadius: 24, marginTop: 24 },
  actions: { gap: 12, marginTop: 20 },
  sectionTitle: { color: colors.text, fontSize: 28, fontWeight: '800', marginTop: 34, marginBottom: 12, textAlign: 'center' },
  stepCard: { marginBottom: 14 },
  stepIcon: { fontSize: 28 },
  stepNumber: { color: colors.primary, fontWeight: '800', marginTop: 8 },
  stepTitle: { color: colors.text, fontWeight: '800', fontSize: 18, marginTop: 2 },
  stepBody: { color: colors.muted, marginTop: 6, lineHeight: 20 },
  footer: { color: colors.muted, textAlign: 'center', marginTop: 22 },
})
