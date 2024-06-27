import * as admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: 'campaign-management-syst-7ad9e.appspot.com',
});

export const bucket = admin.storage().bucket();
