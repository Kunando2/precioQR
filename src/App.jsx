import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cargadeexcel from './componentes/cargas/cargaExcel';
import MostrarListaConsumoPersonal from './componentes/vistaListas/ListaConsumoPersonal';
import MostrarListaComerciante from './componentes/vistaListas/ListaComerciante';
import MostrarListaReventa from './componentes/vistaListas/ListaReventa';
import ErrorBoundary from './componentes/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';

const CargaExcelLink = () => (
  <li className="nav-item">
 
  </li>
);

function App() {
  const [consumoPersonalData, setConsumoPersonalData] = useState(null);
  const [comercianteData, setComercianteData] = useState(null);
  const [reventaData, setReventaData] = useState(null);

  useEffect(() => {
    // Cargar datos almacenados localmente al cargar la página
    const storedConsumoPersonalData = JSON.parse(localStorage.getItem('consumoPersonalData'));
    if (storedConsumoPersonalData) {
      setConsumoPersonalData(storedConsumoPersonalData.jsonData);
    }

    const storedComercianteData = JSON.parse(localStorage.getItem('comercianteData'));
    if (storedComercianteData) {
      setComercianteData(storedComercianteData.jsonData);
    }

    const storedReventaData = JSON.parse(localStorage.getItem('reventaData'));
    if (storedReventaData) {
      setReventaData(storedReventaData.jsonData);
    }
  }, []);

  const handleFileUpload = (newJsonData, listaType) => {
    // Actualiza el estado con los nuevos datos según el tipo de lista
    if (listaType === 'consumoPersonal') {
      setConsumoPersonalData(newJsonData);
      localStorage.setItem('consumoPersonalData', JSON.stringify({ jsonData: newJsonData }));
    } else if (listaType === 'comerciante') {
      setComercianteData(newJsonData);
      localStorage.setItem('comercianteData', JSON.stringify({ jsonData: newJsonData }));
    } else if (listaType === 'reventa') {
      setReventaData(newJsonData);
      localStorage.setItem('reventaData', JSON.stringify({ jsonData: newJsonData }));
    }
  };

  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <h1 className="text-center mt-3">

          <div className="text-center mt-3">
  <h1>
    <img
      src="https://www.golomax.com.ar/public/assets/img/logo.png"
      alt="Logo de Golomax"
      className="ml-2 img-fluid"  // Añade la clase img-fluid para hacer la imagen responsiva
    />
  </h1>
</div>
   </h1>

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <div className="navbar-header">
      {/* <Link className="navbar-brand" to="/">Logo</Link> */}
    </div>
    <div className="navbar-nav ml-auto">
      <Link to="/mostrar/consumoPersonal" className="nav-link">
        <button type="button" className="btn btn-warning">
          Lista Consumo Personal
        </button>
      </Link>
    </div>
    <div className="navbar-nav mx-auto">
      <Link to="/mostrar/comerciante" className="nav-link">
        <button type="button" className="btn btn-warning">
          Lista Comerciante
        </button>
      </Link>
    </div>
    <div className="navbar-nav mr-auto">
      <Link to="/mostrar/reventa" className="nav-link">
        <button type="button" className="btn btn-warning">
          Lista Reventa
        </button>
      </Link>
    </div>
  </div>
</nav>






          <Routes>
            <Route
              path="/"
              element={
                <>
                  <CargaExcelLink />
                  <Cargadeexcel onFileUpload={handleFileUpload} />
                </>
              }
            />
            <Route
              path="/mostrar/consumoPersonal"
              element={<MostrarListaConsumoPersonal jsonData={consumoPersonalData} />}
            />
            <Route
              path="/mostrar/comerciante"
              element={<MostrarListaComerciante jsonData={comercianteData} />}
            />
            <Route
              path="/mostrar/reventa"
              element={<MostrarListaReventa jsonData={reventaData} />}
            />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
