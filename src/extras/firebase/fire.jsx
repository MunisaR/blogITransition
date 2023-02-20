import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC5bgS7BpZLhmavcD755n8cU0ssgbyJ6lM",
  authDomain: "coursework-6ee05.firebaseapp.com",
  projectId: "coursework-6ee05",
  storageBucket: "coursework-6ee05.appspot.com",
  messagingSenderId: "443456696952",
  appId: "1:443456696952:web:bed6ad4d453c6b8ad0f38d",
  measurementId: "G-923QZE2558",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
