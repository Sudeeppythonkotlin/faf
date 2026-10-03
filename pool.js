// Keeps your public "discovery card" (pool/{uid}) in sync with your private profile.
// The card holds ONLY what other students may see. Discoverability OFF = card deleted = nobody can find you.
import { doc, setDoc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

export async function syncPool(db, uid, p, socialDocs) {
  if (!p.profileComplete) return;
  const ref = doc(db, "pool", uid);
  if (!p.discoverable) { try { await deleteDoc(ref); } catch (e) {} return; }
  const socials = {};
  socialDocs.forEach((d) => { if (d.data.visible !== false && d.data.handle) socials[d.id] = d.data.handle; });
  await setDoc(ref, {
    displayName: p.displayName, age: p.age, collegeName: p.collegeName,
    universityId: p.universityId, stateId: p.stateId,
    interests: p.interests || [], avatarConfig: p.avatarConfig, bio: p.bio || "",
    socials, rand: typeof p.rand === "number" ? p.rand : Math.random(),
    updatedAt: serverTimestamp(),
  });
}
