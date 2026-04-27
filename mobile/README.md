# Veda Cortex Mobile

This is the Expo/React Native mobile version of the Veda Cortex website.

## What it includes

- Mobile landing screen matching the website messaging
- Hair quiz using the same quiz data and result logic
- Results screen with hair profile, routine, and recommended products
- Dashboard with routine checklist and saved products
- Firebase Firestore save helpers for mobile login events and quiz results

## Run it

```bash
cd mobile
npm install
npx expo start
```

Press `a` to open the Android emulator.

## Firebase setup

Create `mobile/.env` from `.env.example` and use the same Firebase project values as your web app, but with the `EXPO_PUBLIC_` prefix:

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
```

The mobile app writes to the same `users`, `loginEvents`, and `quizResults` collections as the website, adding `platform: "mobile"`.

## Notes

The current website login only records login activity and does not store passwords. This mobile app mirrors that behavior. For production authentication, add Firebase Authentication to both web and mobile.
