export const fetchUsers = async () => {
  const response = await fetch('/api/admin_list_active_users');
  const users = await response.json();
  return users;
};

export const deleteUserClient = async (userId) => {
  const response = await fetch(`/api/admin_delete_user/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export const createUserClient = async (data) => {
  const response = await fetch('/api/admin_list_active_users', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export const getUserClient = async (userId) => {
  const response = await fetch(`/api/admin_list_active_users/${userId}`);
  const user = await response.json();
  return user;
};

export const editUserClient = async (data, userId) => {
  const response = await fetch(`/api/admin_list_active_users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};
