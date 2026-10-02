# FAF (India students) — Day 1, no npm, no build
1. console.firebase.google.com > Add project > then "</>" Web app > copy the config into firebase.js
2. Build > Authentication > Get started > Sign-in method > enable Google
3. Build > Firestore Database > Create (production mode) > Rules tab > paste firestore.rules > Publish
4. Test locally: in this folder run `python3 -m http.server 8000` and open http://localhost:8000
   (or skip local testing and go straight to step 5)
5. Deploy: app.netlify.com/drop > drag this whole folder in. You get a free URL.
6. Authentication > Settings > Authorized domains > Add your netlify URL (e.g. mysite.netlify.app)
