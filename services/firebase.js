import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Ekle
import { getFirestore } from 'firebase/firestore';

// Firebase Console'dan aldığın config bilgilerini buraya yapıştır
const firebaseConfig = {
  apiKey: "AIzaSyDPzF-6tKcdKgJrT4oLtHrVSdS-XvS6N3g",
  authDomain: "mindcaps-787d4.firebaseapp.com",
  projectId: "mindcaps-787d4",
  storageBucket: "mindcaps-787d4.firebasestorage.app",
  messagingSenderId: "607440555840",
  appId: "1:607440555840:web:caac0f58ae5e7751db74a5"
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Authentication servisini başlat ve AsyncStorage ile persistansı ayarla
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth, db };
