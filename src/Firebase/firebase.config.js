import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHwjol_IdusB0uuMmklhnnkBgIYELJCZc",
  authDomain: "book-shelf-library-management.firebaseapp.com",
  projectId: "book-shelf-library-management",
  storageBucket: "book-shelf-library-management.appspot.com",
  messagingSenderId: "564628862486",
  appId: "1:564628862486:web:e41dc98816f5ad8a66e737"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;