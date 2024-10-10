// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbP_qCrIHblXymRU-EVAaUpBn4FqMAFLM",
  authDomain: "aaditya-web-app.firebaseapp.com",
  projectId: "aaditya-web-app",
  storageBucket: "aaditya-web-app.appspot.com",
  messagingSenderId: "216287011894",
  appId: "1:216287011894:web:bacdd162c07974fb99a497"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Function to handle post submission
export const handlePostSubmit = async (post) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      ...post,
      createdAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Function to handle user signup with email and password
export const handleUserSignup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await sendEmailVerification(user); // Send verification email
    console.log("Verification email sent!");
  } catch (error) {
    console.error("Error signing up:", error);
    throw error; // Rethrow the error for further handling
  }
};

// Function to handle user login
export const handleUserLogin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Login successful!");
  } catch (error) {
    console.error("Error logging in:", error);
    throw error; // Rethrow the error for further handling
  }
};
