// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebase_api_key = import.meta.env.VITE_FIREBASE_API_KEY
const firebase_authDomain = import.meta.env.VITE_FIREBASE_MEHREAD_AUTHDOMAIN
const firebase_projectId = import.meta.env.VITE_FIREBASE_MEHREAD_PROJECTID
const firebase_storageBucket = import.meta.env.VITE_FIREBASE_MEHREAD_STORAGEBUCKET
const firebase_amessagingSenderId = import.meta.env.VITE_FIREBASE_MEHREAD_MESSAGINGSENDERID
const firebase_appId = import.meta.env.VITE_FIREBASE_MEHREAD_APPID

const firebaseConfig = {
  apiKey: firebase_api_key,
  authDomain: firebase_authDomain,
  projectId: firebase_projectId,
  storageBucket: firebase_storageBucket,
  messagingSenderId: firebase_amessagingSenderId,
  appId: firebase_appId,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app
