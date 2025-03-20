import { useCallback, useMemo, useState } from "react";
import { Cabecera } from "./componentes/Cabeceras/Cabecera_Parada/Cabecera";
import { FormularioParada } from "./componentes/FormularioParada";
import { FormularioTiempoLinea } from "./componentes/FormularioTiempoLinea";
import { ParadasContext } from "./contexts/ParadasContext";

function App() {
  const urlParadas = "https://api.tmb.cat/v1/ibus/stops/";
  const appId = "68b27c54";
  const appKey = "ae7f8c10e50256baea7772a20d5124d3";
  const [datosAPI, setDatosAPI] = useState({});
  const [parada, setParada] = useState(null);
  const [linea, setLinea] = useState(null);
  const comprobacionDatosAPI = useCallback(
    () =>
      datosAPI?.status &&
      datosAPI.status === "success" &&
      datosAPI.data?.ibus?.length > 0,
    [datosAPI]
  );
  const minutosTiempoLinea = useMemo(() => {
    let minutos = null;
    if (comprobacionDatosAPI() && linea) {
      const { "t-in-min": min } = datosAPI.data.ibus.find(
        ({ line }) => line === linea
      );
      minutos = min;
    }
    return minutos;
  }, [linea, datosAPI, comprobacionDatosAPI]);
  const getParada = async (parada) => {
    try {
      const response = await fetch(
        `${urlParadas}${parada}?app_id=${appId}&app_key=${appKey}`
      );
      if (!response.ok)
        throw new Error(
          "Error inesperado, no se han devuelto los datos esperados."
        );
      const datos = await response.json();
      return datos;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };
  const buscarParada = async (paradaBuscar) => {
    setLinea(null);
    const datos = await getParada(paradaBuscar);
    setParada(paradaBuscar);
    if (!datos) return;
    setDatosAPI(datos);
  };
  return (
    <ParadasContext.Provider value={{ parada, linea }}>
      <div className="contenedor">
        <Cabecera
          datosAPI={datosAPI}
          comprobacionDatosAPI={comprobacionDatosAPI}
          minutosTiempoLinea={minutosTiempoLinea}
        ></Cabecera>
        <section className="forms">
          <FormularioParada buscarParada={buscarParada}></FormularioParada>
          {comprobacionDatosAPI() && (
            <FormularioTiempoLinea
              datosAPI={datosAPI}
              setLinea={setLinea}
            ></FormularioTiempoLinea>
          )}
        </section>
        {/* <header className="cabecera">
        <h1>Parada nº 15</h1>
        <div className="display">
          <div className="bus">
            <span className="linea">V16</span>
            <span className="destino">Universitat</span>
            <span className="tiempo">10min</span>
          </div>
          <div className="bus">
            <span className="linea">H12</span>
            <span className="destino">Pla de Palau</span>
            <span className="tiempo">1min</span>
          </div>
          <div className="bus">
            <span className="linea">32</span>
            <span className="destino">Barceloneta</span>
            <span className="tiempo">4min</span>
          </div>
        </div>
        <h2>Tiempo para la línea 60: 2 minutos</h2>
      </header>
      <section className="forms">
        <form>
          <label htmlFor="num-parada">Parada nº: </label>
          <input type="number" id="num-parada" />
          <button type="submit">Buscar</button>
        </form>
        <form>
          <label htmlFor="tiempo-linea">Tiempo para que llegue la línea: </label>
          <select id="tiempo-linea">
            <option value="">Elige línea</option>
          </select>
        </form>
      </section> */}
        {/* <header className="cabecera">
        <h2>Bus 109 - Hospital Clínic / Polígon Zona Franca</h2>
        <h3>Polígon Zona Franca -> Hospital Clínic</h3>
        <a href="#">Volver a la portada</a>
      </header>
      <section>
        <ul className="grafico-paradas">
          <li className="parada">
            Parada nº X: Nombre parada (<a href="#">ver mapa</a>)
          </li>
          <li className="parada">
            Parada nº 1741: Cotxeres TB Zona Franca (<a href="#">ver mapa</a>)
          </li>
          <li className="parada">
            Parada nº 1045: Pg Zona Franca - Motors (<a href="#">ver mapa</a>)
          </li>
          <li className="parada">
            Parada nº 1615: Carrer número 4 - Carrer D (<a href="#">ver mapa</a>
            )
          </li>
          <li className="parada">
            Parada nº 1639: Carrer A- Comissaria Portuària (
            <a href="#">ver mapa</a>)
          </li>
          <li className="parada">
            Parada nº 1643: Mercabarna - Mercat del Peix (
            <a href="#">ver mapa</a>)
          </li>
        </ul>
      </section> */}
      </div>
    </ParadasContext.Provider>
  );
}

export default App;
