// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnIXb1TuyNTv1585DkOaEyOhZsqQ6SJVk",
  authDomain: "yt-14869.firebaseapp.com",
  projectId: "yt-14869",
  storageBucket: "yt-14869.appspot.com",
 messagingSenderId: "908382047822",
  appId: "1:908382047822:web:64157e2033365ca7cfbd1f",
  measurementId: "G-XC4J9BM0M4"

};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig;