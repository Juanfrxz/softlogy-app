import axios from 'axios';

// Servicio para obtener facturas
export async function getInvoices(params = {}) {
  const url = 'http://192.168.1.156:8081/api/invoices/admin/get-invoices';
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const headers = {
    'Device': '17997',
    'Authorization': `Bearer ${token}`,
    'x-refresh-token': refreshToken || '',
  };
  // Realiza la petición GET al endpoint de facturas con filtros y paginación
  const response = await axios.get(url, { headers, params });
  // Devolver facturas y totalCount según la estructura del backend
  return {
    facturas: response.data.invoices,
    totalCount: response.data.totalcount || response.data.totalCount || 0,
  };
} 