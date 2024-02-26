// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';

// const Cargadeexcel = ({ onFileUpload }) => {
//   const [uploadMessage, setUploadMessage] = useState(null);

//   const handleFileChange = async (e) => {
//     try {
//       const file = e.target.files[0];
//       const reader = new FileReader();

//       reader.onload = (event) => {
//         const data = new Uint8Array(event.target.result);
//         const workbook = XLSX.read(data, { type: 'array' });

//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];

//         const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//         // Llama a la función proporcionada para manejar los datos cargados
//         onFileUpload(jsonData);

//         // Actualiza el mensaje de carga
//         setUploadMessage('El archivo se cargó correctamente.');
//       };

//       reader.readAsArrayBuffer(file);
//     } catch (error) {
//       console.error('Error al cargar datos desde el archivo:', error);
//       // Muestra un mensaje de error si ocurre un problema
//       setUploadMessage('Error al cargar el archivo. Por favor, verifica el formato.');
//     }
//   };

//   return (
//     <div>
//       <h2>Cargar Lista de Precios</h2>
//       {/* Agregamos un input de tipo file para seleccionar el archivo */}
//       <input type="file" onChange={handleFileChange} />

//       {/* Muestra el mensaje de carga */}
//       {uploadMessage && <p>{uploadMessage}</p>}
//     </div>
//   );
// };

// export default Cargadeexcel;

import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const Cargadeexcel = ({ onFileUpload }) => {
  const [uploadMessage, setUploadMessage] = useState(null);
  const [selectedLista, setSelectedLista] = useState('consumoPersonal');

  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Llama a la función proporcionada para manejar los datos cargados
        onFileUpload(jsonData, selectedLista);

        // Actualiza el mensaje de carga
        setUploadMessage(`El archivo se cargó correctamente en la lista: ${selectedLista}.`);
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error al cargar datos desde el archivo:', error);
      // Muestra un mensaje de error si ocurre un problema
      setUploadMessage('Error al cargar el archivo. Por favor, verifica el formato.');
    }
  };

  const handleListaChange = (e) => {
    setSelectedLista(e.target.value);
  };

  return (
    <div>
      <h2>Cargar Lista de Precios</h2>
      {/* Agregamos un input de tipo file para seleccionar el archivo */}
      <input type="file" onChange={handleFileChange} />

      {/* Agregamos un select para elegir la lista */}
      <label>
        Seleccione la lista:
        <select value={selectedLista} onChange={handleListaChange}>
          <option value="consumoPersonal">Consumo Personal</option>
          <option value="comerciante">Comerciante</option>
          <option value="reventa">Reventa</option>
          {/* Agrega más opciones según sea necesario */}
        </select>
      </label>

      {/* Muestra el mensaje de carga */}
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
};

export default Cargadeexcel;
