import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut }
  from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUV40-Gzk4lW6nKpKVkQZTat1Gpa8SqX4",
  authDomain: "f-a-f-2026.firebaseapp.com",
  projectId: "f-a-f-2026",
  storageBucket: "f-a-f-2026.firebasestorage.app",
  messagingSenderId: "423203553552",
  appId: "1:423203553552:web:7eb3172813f16cb0102595",
  measurementId: "G-1GKYXGP891"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function signInWithGoogle() {
  const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      ageConfirmed: true,
      accountStatus: "active",
      discoverable: false,
      profileComplete: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastActiveAt: serverTimestamp(),
    });
  }
  return user;
}
export const logout = () => signOut(auth);
export const watchUser = (cb) => onAuthStateChanged(auth, cb);
