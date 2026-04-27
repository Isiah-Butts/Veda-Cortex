import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AppProvider, useApp, Page } from './src/lib/app-context'
import { LandingScreen } from './src/screens/LandingScreen'
import { LoginScreen } from './src/screens/LoginScreen'
import { QuizScreen } from './src/screens/QuizScreen'
import { ResultsScreen } from './src/screens/ResultsScreen'
import { DashboardScreen } from './src/screens/DashboardScreen'
import { colors } from './src/lib/theme'

function Header() {
  const { currentPage, setCurrentPage, isLoggedIn, setIsLoggedIn } = useApp()
  const navItems: { label: string; page: Page }[] = [
    { label: 'Home', page: 'landing' },
    { label: 'Quiz', page: 'quiz' },
    { label: 'Dashboard', page: 'dashboard' },
  ]
  return (
    <View style={styles.header}>
      <Pressable onPress={() => setCurrentPage('landing')} style={styles.brandWrap}>
        <Text style={styles.logo}>🌿</Text>
        <Text style={styles.brand}>Veda Cortex</Text>
      </Pressable>
      <View style={styles.nav}>
        {navItems.map((item) => (
          <Pressable key={item.page} onPress={() => setCurrentPage(item.page)} style={[styles.navPill, currentPage === item.page && styles.navActive]}>
            <Text style={[styles.navText, currentPage === item.page && styles.navTextActive]}>{item.label}</Text>
          </Pressable>
        ))}
        <Pressable onPress={() => isLoggedIn ? setIsLoggedIn(false) : setCurrentPage('login')} style={styles.loginPill}>
          <Text style={styles.loginText}>{isLoggedIn ? 'Log out' : 'Log in'}</Text>
        </Pressable>
      </View>
    </View>
  )
}

function Router() {
  const { currentPage } = useApp()
  switch (currentPage) {
    case 'quiz': return <QuizScreen />
    case 'results': return <ResultsScreen />
    case 'dashboard': return <DashboardScreen />
    case 'login': return <LoginScreen />
    default: return <LandingScreen />
  }
}

function Shell() {
  return (
    <SafeAreaView style={styles.safe}>
      <Header />
      <Router />
      <StatusBar style="dark" />
    </SafeAreaView>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <Shell />
      </AppProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: { borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: 'rgba(255,250,244,0.98)', paddingHorizontal: 14, paddingVertical: 10 },
  brandWrap: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  logo: { fontSize: 24 },
  brand: { color: colors.text, fontWeight: '900', fontSize: 19 },
  nav: { flexDirection: 'row', alignItems: 'center', gap: 7, flexWrap: 'wrap' },
  navPill: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 7 },
  navActive: { backgroundColor: colors.primarySoft },
  navText: { color: colors.muted, fontWeight: '700', fontSize: 13 },
  navTextActive: { color: colors.primary },
  loginPill: { marginLeft: 'auto', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1, borderColor: colors.border, backgroundColor: '#fff' },
  loginText: { color: colors.primary, fontWeight: '800', fontSize: 13 },
})
