const admin = require('firebase-admin');

console.log('ENV CHECK:', {
  hasFirebaseEnv: !!process.env.FIREBASE_SERVICE_ACCOUNT,
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT
});

let serviceAccount;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    console.log('✅ Using FIREBASE_SERVICE_ACCOUNT env variable');
  } else {
    serviceAccount = require('./serviceAccountKey.json');
    console.log('✅ Using serviceAccountKey.json file');
  }
} catch (err) {
  console.error('❌ Could not load Firebase credentials:', err.message);
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
