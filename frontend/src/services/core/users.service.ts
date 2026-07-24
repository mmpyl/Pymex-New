const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const parseResponse = async (response) => {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || 'Error al comunicarse con el servicio de usuarios');
  }

  return payload.data ?? payload;
};

export const usersService = {
  async list({ page = 1, limit = 10, empresaId } = {}) {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (empresaId) params.set('empresaId', String(empresaId));

    const response = await fetch(`${API_BASE_URL}/users?${params.toString()}`, {
      headers: getAuthHeaders(),
    });
    return parseResponse(response);
  },

  async create(user) {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(user),
    });
    return parseResponse(response);
  },

  async update(id, user) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(user),
    });
    return parseResponse(response);
  },

  async remove(id) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return parseResponse(response);
  },

  async suspend(id) {
    const response = await fetch(`${API_BASE_URL}/users/${id}/suspend`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return parseResponse(response);
  },
};
