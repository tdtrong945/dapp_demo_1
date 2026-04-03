const API_BASE_URL = 'http://localhost:3001/api';

// Helper function để lấy token từ localStorage
const getAuthToken = () => localStorage.getItem('token');

// Helper function để tạo headers với authorization
const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  ...(getAuthToken() && { Authorization: `Bearer ${getAuthToken()}` })
});

// API functions
export const api = {
  // Auth
  register: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return response.json();
  },

  login: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return response.json();
  },

  loginWithMetamask: async (metamaskAddress) => {
    const response = await fetch(`${API_BASE_URL}/login-metamask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metamaskAddress })
    });
    return response.json();
  },

  // Member
  getCurrentMember: async () => {
    const response = await fetch(`${API_BASE_URL}/member`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  linkMetamask: async (metamaskAddress) => {
    const response = await fetch(`${API_BASE_URL}/link-metamask`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ metamaskAddress })
    });
    return response.json();
  },

  // Admin
  getAllMembers: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/members`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  updateMember: async (memberId, updates) => {
    const response = await fetch(`${API_BASE_URL}/admin/members/${memberId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    return response.json();
  },

  deleteMember: async (memberId) => {
    const response = await fetch(`${API_BASE_URL}/admin/members/${memberId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return response.json();
  },

  // Setup
  setupAdmin: async () => {
    const response = await fetch(`${API_BASE_URL}/setup-admin`, {
      method: 'POST'
    });
    return response.json();
  }
};