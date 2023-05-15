import admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccount = require('../../../admin-keys.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case 'DELETE':
      try {
        const { userId } = query;
        await db.collection('users').doc(userId).delete();
        res.status(200).json({ message: 'User deleted successfully.' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting user.' });
      }
      break;
    default:
      res.status(405).end();
      break;
  }
}
