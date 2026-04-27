import React from 'react'
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native'
import { Button, Card, Chip } from '../components/UI'
import { useApp } from '../lib/app-context'
import { colors } from '../lib/theme'

const iconMap: Record<string, string> = { droplets: '💧', heart: '🤎', sparkles: '✨', wind: '🌬️' }

export function ResultsScreen() {
  const { hairProfile, routineSteps, recommendedProducts, savedProducts, toggleSaveProduct, setCurrentPage, setIsLoggedIn } = useApp()
  if (!hairProfile) {
    return <View style={styles.empty}><Text style={styles.title}>No Results Yet</Text><Text style={styles.muted}>Take the quiz to see your personalized routine.</Text><Button title="Take Quiz" onPress={() => setCurrentPage('quiz')} /></View>
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.kicker}>Your Hair Profile</Text>
      <Text style={styles.heroTitle}>{hairProfile.hairType}</Text>
      <Text style={styles.heroSub}>Based on your answers, here is your personalized hair care routine.</Text>
      <View style={styles.chips}>
        <Chip label={`${hairProfile.porosity} porosity`} />
        <Chip label={`${hairProfile.scalpCondition} scalp`} />
        <Chip label={`${hairProfile.thickness} strands`} />
        <Chip label={`${hairProfile.density} density`} />
        <Chip label={`Goal: ${hairProfile.goal}`} strong />
      </View>
      <Text style={styles.section}>Your Recommended Routine</Text>
      {routineSteps.map((step) => (
        <Card key={step.id} style={styles.item}>
          <Text style={styles.itemTitle}>{iconMap[step.icon] || '✨'} Step {step.step}: {step.name}</Text>
          <Text style={styles.freq}>{step.frequency}</Text>
          <Text style={styles.muted}>{step.description}</Text>
        </Card>
      ))}
      <Text style={styles.section}>Recommended Products</Text>
      {recommendedProducts.map((product) => {
        const saved = savedProducts.some((p) => p.id === product.id)
        return (
          <Card key={product.id} style={styles.item}>
            <View style={styles.productHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.category}>{product.category}</Text>
                <Text style={styles.itemTitle}>{product.name}</Text>
                <Text style={styles.freq}>by {product.brand}</Text>
              </View>
              <Pressable onPress={() => toggleSaveProduct(product)} style={[styles.save, saved && styles.saved]}><Text>{saved ? '★' : '☆'}</Text></Pressable>
            </View>
            <Text style={styles.muted}>{product.description}</Text>
            <Text style={styles.price}>{product.price}</Text>
          </Card>
        )
      })}
      <Card style={styles.cta}>
        <Text style={styles.ctaTitle}>Save Your Results</Text>
        <Text style={styles.muted}>Create an account to save your hair profile, track your routine, and revisit your products anytime.</Text>
        <Button title="Save & Go to Dashboard" onPress={() => { setIsLoggedIn(true); setCurrentPage('dashboard') }} />
        <Button title="Retake Quiz" variant="outline" onPress={() => setCurrentPage('quiz')} />
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 44, backgroundColor: colors.bg },
  empty: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg, gap: 14 },
  kicker: { color: colors.primary, fontWeight: '800', textAlign: 'center', marginTop: 10 },
  heroTitle: { color: colors.text, fontSize: 36, fontWeight: '900', textAlign: 'center', marginTop: 8 },
  heroSub: { color: colors.muted, textAlign: 'center', lineHeight: 21, marginTop: 8 },
  title: { color: colors.text, fontSize: 26, fontWeight: '800' },
  muted: { color: colors.muted, lineHeight: 20 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 18 },
  section: { color: colors.text, fontSize: 25, fontWeight: '800', marginTop: 28, marginBottom: 12 },
  item: { marginBottom: 12 },
  itemTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
  freq: { color: colors.muted, fontSize: 13, marginTop: 3, marginBottom: 8 },
  category: { color: colors.muted, fontSize: 12, fontWeight: '800', textTransform: 'uppercase' },
  productHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  save: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4eee9' },
  saved: { backgroundColor: colors.primarySoft },
  price: { color: colors.text, fontSize: 18, fontWeight: '900', marginTop: 10 },
  cta: { gap: 12, marginTop: 14 },
  ctaTitle: { color: colors.text, fontSize: 22, fontWeight: '800', textAlign: 'center' },
})
