import firebase from 'firebase/app'
import 'firebase/firestore' 

const firebaseConfig = {
    apiKey: "AIzaSyC9qLd7qZsoWqfH5rwnLgpEJ8V7dcIgofY",
    authDomain: "asistecar-42308.firebaseapp.com",
    projectId: "asistecar-42308",
    storageBucket: "asistecar-42308.appspot.com",
    messagingSenderId: "237449464466",
    appId: "1:237449464466:web:0f1fa9ff1df7c05535744b"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)
