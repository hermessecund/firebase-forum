import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDE2y7gYZ6vVKhia6lNZZIWapxLu1B63zk",

  authDomain: "classum-native.firebaseapp.com",

  projectId: "classum-native",

  storageBucket: "classum-native.appspot.com",

  messagingSenderId: "1061291768574",

  appId: "1:1061291768574:web:3b04c05bffd9448fb643af",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();
