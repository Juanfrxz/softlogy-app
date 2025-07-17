import React, { useEffect, useState } from 'react';
import { getInvoices } from '../services/invoiceService';

// Definir las props del componente Invoices
interface InvoicesProps {
  onLogout: () => void;
}

// Definir el tipo de factura (ajustar según backend)
interface Invoice {
  id: number;
  id_factura?: string;
  contrato_id?: string;
  user_id?: string;
  device_code?: string;
  codigo_barras?: string;
  foliopos?: string;
  medio_pago?: string;
  consumo?: number;
}

const PAGE_SIZE = 10;

// Componente para mostrar la lista de facturas con paginación y filtro
const Invoices: React.FC<InvoicesProps> = ({ onLogout }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [contratoId, setContratoId] = useState('');
  const [searchContrato, setSearchContrato] = useState('');

  // Obtener facturas al montar el componente o cambiar de página/filtro
  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      setError(null);
      try {
        const params: any = {
          limit: PAGE_SIZE,
          offset: (page - 1) * PAGE_SIZE,
        };
        if (searchContrato) {
          params.contrato_id = searchContrato;
        }
        const data = await getInvoices(params);
        setInvoices(data.facturas || []);
        setTotalCount(data.totalCount || 0);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al obtener las facturas.');
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, [page, searchContrato]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // Manejar el filtro de contrato_id
  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reiniciar a la primera página al buscar
    setSearchContrato(contratoId.trim());
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Facturas</h2>
        <button className="btn btn-outline-danger" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>
      {/* Filtro por contrato_id */}
      <form className="mb-3 d-flex gap-2" onSubmit={handleFilter}>
        <input
          type="text"
          className="form-control"
          placeholder="Filtrar por Contrato ID"
          value={contratoId}
          onChange={e => setContratoId(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">Buscar</button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => { setContratoId(''); setSearchContrato(''); setPage(1); }}
          disabled={!contratoId && !searchContrato}
        >
          Limpiar
        </button>
      </form>
      {loading ? (
        <div className="alert alert-info">Cargando facturas...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>ID Factura</th>
                <th>Contrato</th>
                <th>User ID</th>
                <th>Device Code</th>
                <th>Código Barras</th>
                <th>Folio POS</th>
                <th>Medio Pago</th>
                <th>Consumo</th>
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
                    <td>{inv.id_factura || '-'}</td>
                    <td>{inv.contrato_id || '-'}</td>
                    <td>{inv.user_id || '-'}</td>
                    <td>{inv.device_code || '-'}</td>
                    <td>{inv.codigo_barras || '-'}</td>
                    <td>{inv.foliopos || '-'}</td>
                    <td>{inv.medio_pago || '-'}</td>
                    <td>{inv.consumo ?? '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* Controles de paginación */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-3 gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Anterior
              </button>
              <span>Página {page} de {totalPages}</span>
              <button
                className="btn btn-secondary"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Invoices; 