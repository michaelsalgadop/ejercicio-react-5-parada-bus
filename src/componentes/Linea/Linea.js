import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ParadasContext } from "../../contexts/ParadasContext";
import { Loading } from "../Loading";

export const Linea = (props) => {
  const { stops, setStops, stopTimes, setStopTimes, trips, setTrips } = props;
  const { linea } = useParams();
  const { cargarDatos, routes, loading, setLoading } =
    useContext(ParadasContext);

  const [datosLinea, setDatosLinea] = useState({
    origen: "",
    destino: "",
    paradas: [],
  });

  const idRuta = useRef(null);

  const getIdRuta = useCallback(() => {
    let ruta = null;

    ruta = routes.find(
      ({ parada }) => parada.toLowerCase() === linea.toLowerCase()
    );
    return ruta ? ruta.id : ruta;
  }, [linea, routes]);

  const setDatos = async () => {
    try {
      if (stops || trips || stopTimes || !linea || !routes) return;
      /**
       * En vez de hacer;
       * let datosParadas = await cargarDatos("stops.txt");
       * let datosTiempoParadas = await cargarDatos("stop_times.txt");
       * let datosViajes = await cargarDatos("trips.txt");
       * Y tener que esperar a que cada una termine antes de ejecutar el siguiente await.
       *
       * Hacemos lo siguiente:
       */
      const [datosParadas, datosTiempoParadas, datosViajes] = await Promise.all(
        [
          cargarDatos("stops.txt"),
          cargarDatos("stop_times.txt"),
          cargarDatos("trips.txt"),
        ]
      );
      /**
       * Promise.all reduce el tiempo total de carga, permitiendo ejecutar las tres promesas en paralelo.
       */

      if (
        datosParadas.length === 0 ||
        datosTiempoParadas.length === 0 ||
        datosViajes.length === 0
      )
        return;
      // Verificar si el componente sigue montado antes de actualizar el estado
      // De esta manera evitar errores si el usuario por ejemplo ya no se encuentra en dicha pantalla.
      setTrips(datosViajes);
      setStops(datosParadas);
      setStopTimes(datosTiempoParadas);
    } catch (error) {
      console.error(`Ocurrio un error: ${error.message}`);
    }
  };
  const getDatosViaje = () =>
    trips.reduce(
      (acumulador, { route_id, service_id, trip_id, trip_headsign }) => {
        if (route_id !== idRuta.current) return acumulador; // Evitamos filtrar antes, descartamos en la reducción.
        if (!acumulador.servicio) {
          return {
            origen: trip_headsign,
            servicio: service_id,
            destino: null,
            viaje: trip_id,
          };
        }

        if (
          acumulador.servicio === service_id &&
          acumulador.origen.toLowerCase() !== trip_headsign.toLowerCase()
        ) {
          return {
            ...acumulador,
            destino: acumulador.destino || trip_headsign, // Solo se asigna la primera vez
          };
        }

        return acumulador;
      },
      {}
    );
  const getDatosIdentificadoresParadas = (idViaje) =>
    stopTimes
      .filter(({ trip_id }) => idViaje && trip_id === idViaje)
      .map(({ stop_id }) => stop_id);
  const getDatosParadas = (datosIdentificadoresParadas) => {
    const setDatosIdentificadoresParadas = new Set(datosIdentificadoresParadas);
    return stops
      .filter(({ stop_id }) => setDatosIdentificadoresParadas.has(stop_id))
      .map(
        ({ stop_code, stop_name, stop_lat, stop_lon }, i, arrayDatos) =>
          arrayDatos.length > 0 && {
            codigo: stop_code,
            nombre: stop_name,
            latitud: stop_lat,
            longitud: stop_lon,
          }
      );
  };

  const getDatosLinea = useCallback(() => {
    try {
      if (!stops || !trips || !stopTimes || !linea || !routes) return;
      if (!idRuta.current) return;
      const datosViajes = getDatosViaje();
      if (!datosViajes?.viaje)
        throw new Error("No se han encontrado viajes de dicha linea!");
      const datosIdentificadoresParadas = getDatosIdentificadoresParadas(
        datosViajes.viaje
      );
      if (
        !datosIdentificadoresParadas ||
        datosIdentificadoresParadas.length === 0
      )
        throw new Error(
          "No se han encontrado paradas relacionadas al viaje de dicha linea!"
        );
      const datosParadas = getDatosParadas(datosIdentificadoresParadas);
      if (!datosParadas || datosParadas.length === 0)
        throw new Error("No se han encontrado paradas de dicha linea!");

      return {
        origen: datosViajes.origen,
        destino: datosViajes.destino,
        paradas: datosParadas,
      };
    } catch (error) {
      console.error(`Ocurrió un error: ${error.message}`);
    }
  }, [linea, routes, stopTimes, stops, trips]);

  useEffect(() => {
    setLoading(true);
    if (!routes) return;
    idRuta.current = routes && routes.length > 0 ? getIdRuta() : null;
    setDatos();
  }, [routes, getIdRuta]);

  useEffect(() => {
    if (!stops || !stopTimes || !trips) return;
    const controller = new AbortController();
    const { signal } = controller;
    const datos = getDatosLinea();
    if (!signal.aborted && datos) setDatosLinea(datos);
    return () => controller.abort();
  }, [stops, stopTimes, trips, getDatosLinea]);
  useEffect(() => {
    if (datosLinea.paradas.length === 0) return;
    setLoading(false);
  }, [datosLinea]);
  return (
    <div className="contenedor">
      {loading ? (
        <Loading infoShowLoading="Cargando datos sobre las lineas para encontrar la linea seleccionada..." />
      ) : (
        <>
          <header className="cabecera">
            <h2>
              Bus {linea} - {datosLinea.origen} / {datosLinea.destino}
            </h2>
            <h3>
              {datosLinea.destino} - {datosLinea.origen}
            </h3>
            <Link to="/" className="pointer">
              Volver a la portada
            </Link>
          </header>
          <section>
            <ul className="grafico-paradas">
              {datosLinea.paradas.map(
                ({ codigo, nombre, latitud, longitud }) => (
                  <li key={codigo} className="parada">
                    Parada nº {codigo}: {nombre} (
                    <a
                      href={`http://maps.google.com/maps?z=19&t=m&q=loc:${latitud}+${longitud}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      ver mapa
                    </a>
                    )
                  </li>
                )
              )}
            </ul>
          </section>
        </>
      )}
    </div>
  );
};
