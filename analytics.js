// Anonymous product analytics: (1) combined daily counters in Firestore for the admin dashboard,
// (2) Firebase Analytics events if a measurementId is present in firebase.js.
import { db } from "./firebase.js";
import { getApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAnalytics, logEvent, isSupported } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
import { doc, setDoc, increment } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

let an = null;
(async () => { try { const app = getApp(); if (app.options.measurementId && (await isSupported())) an = getAnalytics(app); } catch (e) {} })();

export const dayId = (d = new Date()) => d.toISOString().slice(0, 10); // UTC day

// counters: names from the allowed list in firestore.rules
export function track(event, counters = [], params = {}) {
  try { if (an) logEvent(an, event, params); } catch (e) {}
  if (counters.length) {
    const o = {}; counters.forEach((k) => (o[k] = increment(1)));
    setDoc(doc(db, "stats", dayId()), o, { merge: true }).catch(() => {});
  }
}
