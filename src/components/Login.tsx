import React, { useState } from 'react';
import { login as loginService } from '../services/authService';

// Definir las props del componente Login
interface LoginProps {
  onLoginSuccess: () => void;
}

// Componente de Login
const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  // Estados para los campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Llamar al servicio de login
      const data = await loginService(email, password, authCode);
      // Guardar el accessToken en localStorage
      if (data && data.accessToken) {
        localStorage.setItem('token', data.accessToken);
        // Llamar a la función de éxito para actualizar la vista
        onLoginSuccess();
      } else {
        setError('No se recibió el token de acceso del servidor.');
      }
    } catch (err: any) {
      // Mostrar mensaje de error
      setError(err.response?.data?.message || 'Error al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        {/* Campo email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        {/* Campo contraseña */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        {/* Campo auth_code */}
        <div className="mb-3">
          <label htmlFor="authCode" className="form-label">Código de autenticación</label>
          <input
            type="text"
            className="form-control"
            id="authCode"
            value={authCode}
            onChange={e => setAuthCode(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        {/* Mensaje de error */}
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login; 