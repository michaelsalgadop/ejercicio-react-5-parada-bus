import { useEffect, useRef, useState } from "react";
import { Linea } from "./Linea";

export const Display = (props) => {
  const { datosAPI, comprobacionDatosAPI } = props;
  const timer = useRef(null);
  const elementos = useRef([]);
  const [tamanyosElementos, setTamanyosElementos] = useState([0]);
  const [contador, setContador] = useState(0);
  const tamanyo =
    0 -
    (contador < elementos.current.length
      ? tamanyosElementos.reduce(
          (acumulador, tamanyo, i) =>
            i <= contador ? acumulador + tamanyo : acumulador,
          0
        )
      : 0);
  useEffect(() => {
    if (datosAPI?.data?.ibus?.length > 0) {
      clearInterval(timer.current);
      timer.current = setInterval(() => {
        setTamanyosElementos((prevTamanyoElementos) => [
          ...prevTamanyoElementos,
          ...elementos.current
            .filter(
              (elemento, i) =>
                elemento &&
                prevTamanyoElementos[i + 1] !== elemento.offsetHeight
            )
            .map((elemento) => (elemento ? elemento.offsetHeight : 0)),
        ]);
        setContador((prevContador) =>
          prevContador < datosAPI.data.ibus.length ? prevContador + 1 : 0
        );
      }, 2000);
    }
    return () => {
      clearInterval(timer.current);
      setTamanyosElementos([0]);
      elementos.current = [];
    };
  }, [datosAPI]);
  return (
    <div className="display">
      {comprobacionDatosAPI() &&
        datosAPI.data.ibus.map(
          (
            {
              destination,
              line: lineaBus,
              "t-in-min": tiempoEnMinutos,
              routeId,
            },
            i
          ) => (
            <Linea
              key={routeId}
              tipo="bus"
              linea={lineaBus}
              tamanyo={tamanyo}
              destino={destination}
              tiempo={tiempoEnMinutos + "min"}
              referencia={(el) => (elementos.current[i] = el)} // Asignamos la referencia
            ></Linea>
          )
        )}
    </div>
  );
};
