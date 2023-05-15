import admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccount = require('../../admin-keys.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const snapshot = await db.collection('users').get();
        const users = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          lastName: doc.data().lastName,
          email: doc.data().email,
          company: doc.data().company,
        }));
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving users.' });
      }
      break;
    case 'POST':
      try {
        await db.collection('users').add(body);
        res.status(201).json({ message: 'User added successfully.' });
      } catch (error) {
        res.status(500).json({ message: 'Error adding user.' });
      }
      break;
    case 'PUT':
      try {
        const { id, name, age } = body;
        await db.collection('users').doc(id).update({ name, age });
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
