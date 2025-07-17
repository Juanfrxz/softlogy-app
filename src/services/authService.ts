import axios from 'axios';

// Servicio de autenticación para login
export async function login(email: string, password: string, auth_code: string) {
  const url = 'http://192.168.1.156:8081/api/auth/login';
  const headers = {
    'Device': '17997',
    'Content-Type': 'application/json',
  };
  const body = {
    email,
    password,
    auth_code,
  };
  // Realiza la petición POST al endpoint de login
  const response = await axios.post(url, body, { headers });
  return response.data;
}

// Servicio de logout real
export async function logout() {
  const url = 'http://192.168.1.156:8081/api/auth/logout';
  const token = localStorage.getItem('token');
  const headers = {
    'Device': '17997',
    'Authorization': `Bearer ${token}`,
  };
  // Realiza la petición POST al endpoint de logout
  await axios.post(url, null, { headers });
} 