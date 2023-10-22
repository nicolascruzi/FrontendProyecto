import logo from './logo.svg';
import './App.css';
import imagen from './components/Images/medi.jpg'
import imgredfarm from './components/Images/redfarma.png'
import imgcruzverde from './components/Images/bbn_cruzverde.jpg'
import imgahumada from './components/Images/Farmacias_Ahumada_Logo.svg.png'
import Medicamento from './components/Medicamento/medicamento.js'
import { useEffect, useState } from 'react';

function App() {

  const [medicamentoBuscado, setMedicamentoBuscado] = useState("");
  const [medicamentosAhumada, setMedicamentosAhumada] = useState([]);
  const [medicamentosRedFarma, setMedicamentosRedFarma] = useState([]);
  const [medicamentosCruzVerde, setMedicamentosCruzVerde] = useState([]);
  const [loading, setLoading] = useState();
  const [inputBuscar, setInputBuscar] = useState("Busca tu medicamento...");

  const buscarMedicamentos = async () => {
    setMedicamentosAhumada([]);
    setMedicamentosRedFarma([]);
    setMedicamentosCruzVerde([]);
    setInputBuscar("Busca tu medicamento...");

    setLoading(true);
    const fetchMedicamentos = async () => {
      try {
        const [ahumadaData, redFarmaData, cruzVerdeData] = await Promise.all([
          fetch(`http://localhost:3000/farmacias/ahumada?search=${medicamentoBuscado}`).then(response => response.json()),
          fetch(`http://localhost:3000/farmacias/redfarma?search=${medicamentoBuscado}`).then(response => response.json()),
          fetch(`http://localhost:3000/farmacias/cruzverde?search=${medicamentoBuscado}`).then(response => response.json())
        ]);

        setMedicamentosAhumada(ahumadaData);
        setMedicamentosRedFarma(redFarmaData);
        setMedicamentosCruzVerde(cruzVerdeData);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);

      }
    };
    fetchMedicamentos();
  }

  return (
    <div>
      <img className="foto_grande" src={imagen} alt="" />
      <div className="App">

        <div className='title'>
          El precio justo
        </div>

        <div class="search-container">
          <input
            type="text"
            placeholder={inputBuscar}
            value={medicamentoBuscado}
            onChange={(e) => setMedicamentoBuscado(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                buscarMedicamentos();
              }
            }}
          />
          <button type="submit" onClick={buscarMedicamentos}>Buscar</button>
        </div>
        <div className='contenedor-columnas'>
          <div className='contenedor-farmacia'>

            <div className='titulo-columna'>
              <h2>Ahumada</h2>
            </div>
            <div>
              <img className="logo_farmacia" src={imgahumada} alt="" />
            </div>
            <div className='contenedor-lista-medicamentos'>
              {medicamentosAhumada.length > 0 && medicamentosAhumada.map(medicamento => (
                <Medicamento name={medicamento.name} price={medicamento.price} key={medicamento.id} />
              ))}
              {medicamentosAhumada.length === 0 && loading === false &&
                <div className="text-center">No se encontraron resultados</div>
              }
              {loading &&
                <div className="spinner"></div>}

            </div>


          </div>
          <div className='contenedor-farmacia'>
            <div className='titulo-columna'>
              <h2>RedFarma</h2>
            </div>
            <div>
              <img className="logo_farmacia" src={imgredfarm} alt="" />
            </div>
            <div className='contenedor-lista-medicamentos'>
              {medicamentosRedFarma.length > 0 &&
                medicamentosRedFarma.map(medicamento => (
                  <Medicamento name={medicamento.name} price={medicamento.price} key={medicamento.id} />
                ))
              }
              {medicamentosRedFarma.length === 0 && loading === false &&
                <div className="text-center">No se encontraron resultados</div>
              }
              {loading &&
                <div className="container-spinner">

                  <div className="spinner"></div>
                </div>
              }
            </div>
          </div>
          <div className='contenedor-farmacia'>
            <div className='titulo-columna'>
              <h2>Cruz Verde</h2>
            </div>
            <div>
              <img className="logo_farmacia" src={imgcruzverde} alt="" />
            </div>
            <div className='contenedor-lista-medicamentos'>
              {medicamentosCruzVerde.length > 0 &&
                medicamentosCruzVerde.map(medicamento => (
                  <Medicamento name={medicamento.name} price={medicamento.price} key={medicamento.id} />
                ))
              }
              {medicamentosCruzVerde.length === 0 && loading === false &&
                <div className="text-center">No se encontraron resultados</div>
              }
              {loading &&
                <div className="spinner"></div>}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
