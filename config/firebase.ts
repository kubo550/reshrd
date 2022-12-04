import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import admin from "firebase-admin";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// if (!admin.apps.length) {
//     admin.initializeApp({
//         credential: admin.credential.cert({
//             projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//             clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//             privateKey: process.env.FIREBASE_PRIVATE_KEY,
//         }),
//         databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
//     });
// }

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);