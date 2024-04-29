import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MostrarLista.css';
import axios from 'axios';

const MostrarListaComerciante = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jsonData, setJsonData] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('codigo');

  useEffect(() => {
    axios.get('http://localhost:3001/api/listas')
      .then(response => {
        const data = response.data;
        setJsonData(data);
      })
      .catch(error => {
        console.error('Error al obtener la lista desde el backend:', error);
      });
  }, []);

  const processRow = (row) => {
    const filteredRow = row.filter(cell => cell !== null && cell !== undefined && String(cell).trim() !== '');

    if (filteredRow.length >= 3) {
      return {
        codigo: filteredRow[0],
        descripcion: filteredRow[1],
        precio: filteredRow[2]
      };
    }
    return null;
  };

  const extractProducts = (excelData) => {
    const extractedProducts = [];

    if (Array.isArray(excelData)) {
      excelData.forEach((rowData) => {
        if (Array.isArray(rowData)) {
          const product = processRow(rowData);
          if (product) {
            extractedProducts.push(product);
          }
        }
      });
    }

    return extractedProducts;
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const cleanString = (str) => {
    if (typeof str !== 'string') {
      return '';
    }
    return str.toLowerCase().replace(/[^\w\s]/g, "").trim();
  };
  

  const filteredProducts = jsonData
  ? jsonData
      .map((list) => extractProducts(list.contenido))
      .flat()
      .filter(item => {
        const cleanedSearchTerm = cleanString(searchTerm);
        const cleanedCodigo = cleanString(item.codigo);
        const cleanedDescripcion = cleanString(item.descripcion);
        const cleanedPrecio = cleanString(item.precio);
        
        return (
          cleanedCodigo.includes(cleanedSearchTerm) ||
          cleanedDescripcion.includes(cleanedSearchTerm) ||
          cleanedPrecio.includes(cleanedSearchTerm)
        );
      })
      .sort((a, b) => {
        if (a[sortCriteria] < b[sortCriteria]) return -1;
        if (a[sortCriteria] > b[sortCriteria]) return 1;
        return 0;
      })
  : [];

  return (
    <div className="container">
      <h2>Lista Comerciante</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-start align-items-center mb-3">
        <button
          className={`btn btn-primary ${sortCriteria === 'codigo' ? 'active' : ''}`}
          onClick={() => handleSortChange('codigo')}
        >
          Ordenar por Código
        </button>
        <button
          className={`btn btn-primary ${sortCriteria === 'descripcion' ? 'active' : ''}`}
          onClick={() => handleSortChange('descripcion')}
        >
          Ordenar por Descripción
        </button>
        <button
          className={`btn btn-primary ${sortCriteria === 'precio' ? 'active' : ''}`}
          onClick={() => handleSortChange('precio')}
        >
          Ordenar por Precio
        </button>
      </div>
      <div className="table-responsive table-container">
        {filteredProducts.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Código</th>
                <th>Descripción</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((item, index) => (
                <tr key={index}>
                  <td>{item.codigo}</td>
                  <td>{item.descripcion}</td>
                  <td>{item.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="alert alert-info">No hay datos para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default MostrarListaComerciante;
