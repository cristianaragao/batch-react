import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyDjo7OLlzN21GNMCGsI1kYo_a6UZUTgcx4",
  authDomain: "teste-batch-d2a13.firebaseapp.com",
  projectId: "teste-batch-d2a13",
  storageBucket: "teste-batch-d2a13.appspot.com",
  messagingSenderId: "1057011869331",
  appId: "1:1057011869331:web:f8c4dce99a502bdf304f66",
};

firebase.initializeApp(config);

export const db = firebase.firestore();
