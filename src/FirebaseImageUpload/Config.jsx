// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7h7SCHQ12ulZKlkeMPjyYp4K3uxUrOJE",
  authDomain: "uzum-29ec6.firebaseapp.com",
  projectId: "uzum-29ec6",
  storageBucket: "uzum-29ec6.appspot.com",
  messagingSenderId: "481238901876",
  appId: "1:481238901876:web:fab0744ae83e0bf2591d21",
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
