import * as firebaseAdmin from 'firebase-admin';



if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY!.replace(/\\n/gm, "\n"),
            clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        }),
        databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
    });
}

export { firebaseAdmin };