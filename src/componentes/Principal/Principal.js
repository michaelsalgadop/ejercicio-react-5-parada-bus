import { useCallback, useContext, useMemo, useState } from "react";
import { Cabecera } from "./Cabecera/Cabecera";
import { FormularioParada } from "./FormularioParada";
import { FormularioTiempoLinea } from "./FormularioTiempoLinea";
import { ParadasContext } from "../../contexts/ParadasContext";
import { Loading } from "../Loading";
export const Principal = (props) => {
  const { setLinea, setParada } = props;
  const { linea, loading } = useContext(ParadasContext);
  const urlParadas = "https://api.tmb.cat/v1/ibus/stops/";
  const appId = process.env.REACT_APP_APP_ID;
  const appKey = process.env.REACT_APP_APP_KEY;
  const [datosAPI, setDatosAPI] = useState({});
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
    <div className="contenedor">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Cabecera
            datosAPI={datosAPI}
            comprobacionDatosAPI={comprobacionDatosAPI}
            minutosTiempoLinea={minutosTiempoLinea}
          />
          <section className="forms">
            <FormularioParada buscarParada={buscarParada} />
            {comprobacionDatosAPI() && (
              <FormularioTiempoLinea datosAPI={datosAPI} setLinea={setLinea} />
            )}
          </section>
        </>
      )}
    </div>
  );
};
