import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore, setLogLevel } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

// Mute internal SDK logs/warnings during preview iframe connection negotiation
try {
  setLogLevel('silent');
} catch (e) {}

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const databaseId = (firebaseConfig as any).firestoreDatabaseId || '(default)';

// Configure Firestore with long-polling & robust error handling for iframe preview environments
let firestoreDb;
try {
  firestoreDb = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  }, databaseId);
} catch (e) {
  firestoreDb = getFirestore(app, databaseId);
}

export const db = firestoreDb;
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
