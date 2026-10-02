// The FIND SOMEONE engine (browser version). Picks ONE random eligible student.
import { collection, query, where, orderBy, limit, getDocs, getDoc, setDoc, deleteDoc, doc, Timestamp, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { UNIVERSITIES } from "./universities.js";

export const COOLDOWN_DAYS = 30; // same person won't reappear for this long

export async function loadContext(db, uid) {
  const [me, blocked, blockedBy, hist] = await Promise.all([
    getDoc(doc(db, "users", uid)),
    getDocs(collection(db, "users", uid, "blocked")),
    getDocs(collection(db, "users", uid, "blockedBy")),
    getDocs(query(collection(db, "users", uid, "discoveries"), where("expiresAt", ">", Timestamp.now()))),
  ]);
  const exclude = new Set([uid]);
  [blocked, blockedBy, hist].forEach((snap) => snap.forEach((d) => exclude.add(d.id)));
  return { uid, me: me.data() || {}, exclude };
}

const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

async function fetchCandidates(db, ctx, mode, r) {
  const pool = collection(db, "pool");
  const rows = (snap) => snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  if (mode === "university" || mode === "state") {
    const field = mode === "university" ? "universityId" : "stateId";
    const snap = await getDocs(query(pool, where(field, "==", ctx.me[field]), where("active", "==", true), where("rand", ">=", r), orderBy("rand"), limit(8)));
    return rows(snap);
  }
  // other universities: every university except mine, in chunks of 30 ("in" limit), queried together
  const ids = shuffle(UNIVERSITIES.filter((u) => u.id !== ctx.me.universityId).map((u) => u.id));
  const chunks = []; for (let i = 0; i < ids.length; i += 30) chunks.push(ids.slice(i, i + 30));
  const snaps = await Promise.all(chunks.map((c) =>
    getDocs(query(pool, where("universityId", "in", c), where("active", "==", true), where("rand", ">=", r), orderBy("rand"), limit(4)))));
  return snaps.flatMap(rows);
}

// returns a public profile object, or null when nobody eligible is found
export async function findSomeone(db, ctx, mode) {
  for (const r of [Math.random(), 0]) {            // second pass wraps around to the start
    const cands = (await fetchCandidates(db, ctx, mode, r)).filter((c) => !ctx.exclude.has(c.id));
    if (cands.length) {
      const pick = cands[Math.floor(Math.random() * cands.length)];
      await setDoc(doc(db, "users", ctx.uid, "discoveries", pick.id), {
        at: serverTimestamp(), expiresAt: Timestamp.fromMillis(Date.now() + COOLDOWN_DAYS * 864e5), mode,
      });
      ctx.exclude.add(pick.id);
      return pick;
    }
  }
  return null;
}

export async function resetHistory(db, uid) { // testing helper only
  const snap = await getDocs(collection(db, "users", uid, "discoveries"));
  await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
}
