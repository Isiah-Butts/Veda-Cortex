import React from 'react'
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { colors, shadow } from '../lib/theme'

export function Button({ title, onPress, variant = 'primary', disabled = false }: { title: string; onPress: () => void; variant?: 'primary' | 'outline' | 'ghost'; disabled?: boolean }) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [styles.button, styles[variant], disabled && styles.disabled, pressed && !disabled && { opacity: 0.82 }]}>
      <Text style={[styles.buttonText, variant !== 'primary' && styles.altText]}>{title}</Text>
    </Pressable>
  )
}

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>
}

export function Chip({ label, strong = false }: { label: string; strong?: boolean }) {
  return <View style={[styles.chip, strong && styles.chipStrong]}><Text style={[styles.chipText, strong && styles.chipStrongText]}>{label}</Text></View>
}

const styles = StyleSheet.create({
  button: { minHeight: 48, borderRadius: 16, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center' },
  primary: { backgroundColor: colors.primary },
  outline: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  ghost: { backgroundColor: 'transparent' },
  disabled: { opacity: 0.45 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  altText: { color: colors.primary },
  card: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 24, padding: 18, ...shadow },
  chip: { borderRadius: 999, borderWidth: 1, borderColor: colors.border, backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 7, marginRight: 8, marginBottom: 8 },
  chipStrong: { backgroundColor: colors.primarySoft, borderColor: '#dec2ad' },
  chipText: { color: colors.text, fontSize: 13 },
  chipStrongText: { color: colors.primary, fontWeight: '700' },
})
