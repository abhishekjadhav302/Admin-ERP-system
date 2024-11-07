import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfDbuf8EHI2fsqQRBKSHFRxSf14he5zz8",
  authDomain: "erp-system-652bf.firebaseapp.com",
  projectId: "erp-system-652bf",
  storageBucket: "erp-system-652bf.appspot.com",
  messagingSenderId: "74289057406",
  appId: "1:74289057406:web:f54fe6c5b1689e1924122f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, doc, addDoc, getDocs, updateDoc, deleteDoc };
