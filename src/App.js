import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import { ParadasContext } from "./contexts/ParadasContext";
import { Principal } from "./componentes/Principal/Principal";
import { useEffect, useState } from "react";
import { Linea } from "./componentes/Linea/Linea";
import { PageNotFound } from "./componentes/PageNotFound";
import { useGTFSReader } from "./hooks/useGTFSReader";

function App() {
  const [parada, setParada] = useState(null);
  const [linea, setLinea] = useState(null);

  const [routes, setRoutes] = useState(null);
  const [stops, setStops] = useState(null);
  const [stopTimes, setStopTimes] = useState(null);
  const [trips, setTrips] = useState(null);

  const [loading, setLoading] = useState(false);
  const { getDataGTFSReader } = useGTFSReader();
  const cargarDatos = async (nombreArchivo, key = null, value = null) => {
    try {
      const datos = await getDataGTFSReader(nombreArchivo, key, value);
      if (datos.length === 0)
        throw new Error("No se ha podido obtener información del archivo");
      return datos;
    } catch (error) {
      console.warn(error.message);
      return [];
    }
  };
  const obtenerDatosRutas = (rutas) =>
    rutas
      .filter(
        ({ route_type, route_short_name }) =>
          route_type === 3 &&
          route_short_name.toString().slice(0, 1).toUpperCase() !== "L"
      )
      .map(({ route_id, route_short_name }) => ({
        id: route_id,
        parada: route_short_name.toString(),
      }));
  const getRutas = async (isMounted) => {
    setLoading(true);
    if (routes) {
      setLoading(false);
      return;
    }
    let rutas = await cargarDatos("routes.txt");
    if (isMounted && rutas.length > 0) setRoutes(obtenerDatosRutas(rutas));
    setLoading(false);
  };
  useEffect(() => {
    let isMounted = true;
    getRutas(isMounted);
    return () => {
      isMounted = false; // Evitar actualizar el estado si el componente se desmonta
    };
  }, []);
  return (
    <ParadasContext.Provider
      value={{
        parada,
        linea,
        routes,
        loading,
        setLoading,
        cargarDatos,
      }}
    >
      <Router>
        <Routes>
          {/* Elimina `exact`, ya no es necesario, las rutas coinciden exactamente por defecto */}
          <Route
            path="/"
            element={<Principal setLinea={setLinea} setParada={setParada} />}
          ></Route>
          <Route
            path="/linea/:linea"
            element={
              <Linea
                stops={stops}
                setStops={setStops}
                stopTimes={stopTimes}
                setStopTimes={setStopTimes}
                trips={trips}
                setTrips={setTrips}
              ></Linea>
            }
          ></Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
      </Router>
    </ParadasContext.Provider>
  );
}

export default App;
