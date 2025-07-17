import React from 'react';

// Definir las props del componente Invoices
interface InvoicesProps {
  onLogout: () => void;
}

// Componente para mostrar la lista de facturas
const Invoices: React.FC<InvoicesProps> = ({ onLogout }) => {
  // Aquí luego se mostrarán las facturas obtenidas del backend
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Facturas</h2>
        <button className="btn btn-outline-danger" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>
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
          {/* Aquí se renderizarán las filas de facturas */}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices; 