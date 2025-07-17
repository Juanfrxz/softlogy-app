import React, { useEffect, useState } from 'react';
import { getInvoices } from '../services/invoiceService';

// Definir las props del componente Invoices
interface InvoicesProps {
  onLogout: () => void;
}

// Definir el tipo de factura (ajustar según backend)
interface Invoice {
  id: number;
  contrato_id?: string;
  consumo?: number;
  lectura_actual?: number;
  prefijo?: string;
  foliopos?: number;
  pagada?: boolean;
  fecha_lectura_inicio?: string;
  fecha_pago_inicio?: string;
}

// Componente para mostrar la lista de facturas
const Invoices: React.FC<InvoicesProps> = ({ onLogout }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener facturas al montar el componente
  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getInvoices();
        // Ajustar según la estructura real de la respuesta
        setInvoices(data.items || data || []);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al obtener las facturas.');
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Facturas</h2>
        <button className="btn btn-outline-danger" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>
      {loading ? (
        <div className="alert alert-info">Cargando facturas...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Contrato</th>
              <th>Consumo</th>
              <th>Lectura Actual</th>
              <th>Prefijo</th>
              <th>Folio POS</th>
              <th>Pagada</th>
              <th>Fecha Lectura</th>
              <th>Fecha Pago</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center">No hay facturas para mostrar.</td>
              </tr>
            ) : (
              invoices.map((inv) => (
                <tr key={inv.id}>
                  <td>{inv.id}</td>
                  <td>{inv.contrato_id || '-'}</td>
                  <td>{inv.consumo ?? '-'}</td>
                  <td>{inv.lectura_actual ?? '-'}</td>
                  <td>{inv.prefijo || '-'}</td>
                  <td>{inv.foliopos ?? '-'}</td>
                  <td>{inv.pagada ? 'Sí' : 'No'}</td>
                  <td>{inv.fecha_lectura_inicio ? new Date(inv.fecha_lectura_inicio).toLocaleDateString() : '-'}</td>
                  <td>{inv.fecha_pago_inicio ? new Date(inv.fecha_pago_inicio).toLocaleDateString() : '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Invoices; 