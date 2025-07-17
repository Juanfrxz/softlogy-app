import axios from 'axios';

// Servicio para obtener facturas
export async function getInvoices(params = {}) {
  const url = 'http://localhost:3001/api/invoices/admin/get-invoices';
  const token = localStorage.getItem('token');
  const headers = {
    // 'Cookie': 'XDEBUG_SESSION=VSCODE', // No se puede enviar desde frontend
    'Device': '17997',
    'Authorization': `Bearer ${token}`,
  };
  // Realiza la petición GET al endpoint de facturas
  const response = await axios.get(url, { headers, params });
  return response.data;
} 