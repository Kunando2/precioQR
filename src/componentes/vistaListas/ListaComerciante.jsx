import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MostrarLista.css';

const MostrarListaComerciante = ({ jsonData }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const headers = jsonData && jsonData.length > 0 ? jsonData[0] : [];

  const processRow = (row) => {
    const filteredRow = row.filter(
      (cell) => cell !== undefined && cell !== null && cell !== ''
    );

    if (filteredRow.length > 0) {
      if (filteredRow[0] && typeof filteredRow[0] === 'string') {
        const numbers = filteredRow[0].match(/\d+/g);

        if (!numbers) {
          return [];
        }

        filteredRow[0] = numbers.join('');
      }

      return filteredRow;
    }

    return [];
  };

  const filteredData = jsonData
    ? jsonData
        .filter((row) =>
          row.some(
            (cell) =>
              cell &&
              cell.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
        .map((row) => processRow(row))
    : [];

  return (
    <div className="container">
      <h2>Lista Comerciante</h2>
      <div className="mb-3">
        {/* Agrega un input para la búsqueda */}
        <input
          type="text"
          className="form-control"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="table-header">
        {/* Estructura para la cabecera de la tabla */}
        <div>CODIGO</div>
        <div>NOMBRE</div>
        <div>PRECIO</div>
      </div>
      <div className="table-responsive">
        {filteredData && filteredData.length > 0 ? (
          <div className="table-container">
            <table className="table table-striped">
              <thead>
                <tr>
                  {/* Mapea los encabezados si existen */}
                  {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={cellIndex === 0 ? 'primera-celda' : ''}
                      >
                        {cellIndex === 2 && typeof cell === 'number'
                          ? `$${cell.toFixed(2)}`
                          : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="alert alert-info">No hay datos para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default MostrarListaComerciante;
