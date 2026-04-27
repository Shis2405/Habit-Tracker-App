const admin = require('firebase-admin');

let serviceAccount;
try {
  serviceAccount = require('./serviceAccountKey.json');
} catch (err) {
  console.error('❌ Could not load serviceAccountKey.json:', err.message);
  process.exit(1);
}

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('✅ Firebase connected');
  } catch (err) {
    console.error('❌ Firebase init failed:', err.message);
    process.exit(1);
  }
}

const db = admin.firestore();

module.exports = { admin, db };
