import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4ML0-fs3jGn3c-awZSDLFb2tN8sUvRHY",
  authDomain: "grocery-web-49145.firebaseapp.com",
  projectId: "grocery-web-49145",
  storageBucket: "grocery-web-49145.firebasestorage.app",
  messagingSenderId: "935250977497",
  appId: "1:935250977497:web:6265fbaaf6a554d04454c8",
  measurementId: "G-94MY0W6P1T"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
