// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBoeG-XCMgbh5X31eD4qn_gEhlUOEBbRA",
  authDomain: "quikscene.firebaseapp.com",
  projectId: "quikscene",
  storageBucket: "quikscene.appspot.com",
  messagingSenderId: "330029004393",
  appId: "1:330029004393:web:ed6f1e1b9b03c0452dd4f8",
  measurementId: "G-3EHJZQ8GVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Only call getAnalytics if it's a web app
// const analytics = getAnalytics(app);
// Initialize Firebase Auth with AsyncStorage for persistence
initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  
  export default app;
