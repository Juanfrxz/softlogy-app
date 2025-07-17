import Login from './components/Login';
import Invoices from './components/Invoices';
import { useState, useEffect } from 'react';
import './App.css'
import { logout as logoutService } from './services/authService';

function App() {
  // Estado para saber si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));

  // Efecto para escuchar cambios en el token (por ejemplo, si se borra manualmente)
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
    window.addEventListener('storage', checkToken);
    return () => window.removeEventListener('storage', checkToken);
  }, []);

  // Función que se llama cuando el login es exitoso
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Función para cerrar sesión (logout)
  const handleLogout = async () => {
    try {
      await logoutService(); // Llama al endpoint real de logout
    } catch (error) {
      // Si hay error, igual limpiamos el localStorage
      console.error('Error al hacer logout en el backend:', error);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };

  // Mostrar facturas si está autenticado, si no mostrar login
  return isAuthenticated ? <Invoices onLogout={handleLogout} /> : <Login onLoginSuccess={handleLoginSuccess} />;
}

export default App
