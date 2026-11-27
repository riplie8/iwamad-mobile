import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDptJgqRzgXPLLgKyVwY7mlsKwQTjkNDS0",
  authDomain: "iwamad-chat-a4347.firebaseapp.com",
  databaseURL: "https://iwamad-chat-a4347-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iwamad-chat-a4347",
  storageBucket: "iwamad-chat-a4347.firebasestorage.app",
  messagingSenderId: "691849966475",
  appId: "1:691849966475:web:26157b08c137eba271f58e"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);