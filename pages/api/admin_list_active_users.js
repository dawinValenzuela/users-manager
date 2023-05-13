import users from '@src/utils/mocks/users';

export default function handler(req, res) {
  res.status(200).json(users);
}
