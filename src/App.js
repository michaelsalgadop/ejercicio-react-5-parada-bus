import { Cabecera } from "./componentes/Cabeceras/Cabecera_Parada/Cabecera";
import { FormularioParada } from "./componentes/FormularioParada";
import { FormularioTiempoLinea } from "./componentes/FormularioTiempoLinea";

function App() {
  return (
    <div className="contenedor">
      <Cabecera></Cabecera>
      <section className="forms">
        <FormularioParada></FormularioParada>
        <FormularioTiempoLinea></FormularioTiempoLinea>
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
  );
}

export default App;
