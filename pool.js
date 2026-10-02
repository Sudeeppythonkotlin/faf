// Keeps a small PUBLIC copy of your profile (no email, no DOB) in "pool/<uid>" so FIND SOMEONE can discover you.
import { doc, getDoc, getDocs, setDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

function ageFrom(dobStr, fallback) {
  if (!dobStr) return fallback;
  const d = new Date(dobStr), n = new Date();
  let a = n.getFullYear() - d.getFullYear();
  const m = n.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && n.getDate() < d.getDate())) a--;
  return a;
}

export async function syncPool(db, uid) {
  const us = await getDoc(doc(db, "users", uid));
  if (!us.exists()) return;
  const u = us.data();
  if (!(u.profileComplete && u.avatarConfig && u.universityId)) return; // profile not finished yet
  const soc = await getDocs(collection(db, "users", uid, "socials"));
  const socials = {};
  soc.forEach((d) => { if (d.data().visible !== false) socials[d.id] = d.data().handle; });
  await setDoc(doc(db, "pool", uid), {
    displayName: u.displayName, age: ageFrom(u.dateOfBirth, u.age), collegeName: u.collegeName,
    universityId: u.universityId, stateId: u.stateId, avatarConfig: u.avatarConfig,
    interests: u.interests || [], bio: u.bio || "",
    rand: typeof u.rand === "number" ? u.rand : Math.random(),
    active: u.discoverable === true && u.accountStatus === "active",
    socials, updatedAt: serverTimestamp(),
  });
}
