import admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccount = require('../../../admin-keys.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  const { method, query, body } = req;

  switch (method) {
    case 'GET':
      try {
        const { userId } = query;
        const snapshot = await db.collection('users').doc(userId).get();
        const user = snapshot.data();
        res.status(200).json({ id: userId, ...user });
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving user.' });
      }
      break;
    case 'PUT':
      try {
        const { userId } = query;
        await db.collection('users').doc(userId).update(body);
        res.status(200).json({ message: 'User updated successfully.' });
      } catch (error) {
        res.status(500).json({ message: 'Error updating user.' });
      }
      break;
    default:
      res.status(405).end();
      break;
  }
}
