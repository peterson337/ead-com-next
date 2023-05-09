import React from 'react';
import {initializeApp} from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import {getMetadata} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD0LHfWf_gKrV5G-XHcefshAUBKc0rPkJk",
    authDomain: "ead-next.firebaseapp.com",
    projectId: "ead-next",
    storageBucket: "ead-next.appspot.com",
    messagingSenderId: "37644581114",
    appId: "1:37644581114:web:b7a136c6183f1c3007f143",
    measurementId: "G-MJY5JBDJQD"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const storage = getStorage(app);

    export{db, provider, auth, storage, getMetadata};

    const Firebase = () => {
        return null;
      };
      
      export default Firebase;