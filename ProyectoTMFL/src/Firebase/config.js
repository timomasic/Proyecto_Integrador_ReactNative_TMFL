import app from 'firebase/app';
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4ikIrNtBxbOFNPs9vHc5BQjt5C6zOhW0",
  authDomain: "react-native-tmfl.firebaseapp.com",
  projectId: "react-native-tmfl",
  storageBucket: "react-native-tmfl.appspot.com",
  messagingSenderId: "116240272749",
  appId: "1:116240272749:web:a5b57f4e5e44a2a33e1e64"
};
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();